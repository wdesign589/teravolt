import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';
import { getUserActiveCopyTrading, createUserCopyTrading } from '@/lib/models/UserCopyTrading';
import { getCopyTraderById } from '@/lib/models/CopyTrader';
import { UserDocument } from '@/lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || '';

async function verifyUser(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🎯 [Copy Trading Start] Request received');
    
    const user = await verifyUser(request);
    
    if (!user) {
      console.log('❌ [Copy Trading Start] Unauthorized');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { traderId, allocationAmount } = body;

    console.log('📊 [Copy Trading Start] User:', user.userId);
    console.log('📊 [Copy Trading Start] Trader ID:', traderId);
    console.log('📊 [Copy Trading Start] Allocation:', allocationAmount);

    // Validation
    if (!traderId || !allocationAmount) {
      return NextResponse.json(
        { error: 'Trader ID and allocation amount are required' },
        { status: 400 }
      );
    }

    if (allocationAmount <= 0) {
      return NextResponse.json(
        { error: 'Allocation amount must be greater than 0' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection<UserDocument>('users');

    // Get user data
    const userData = await usersCollection.findOne({ _id: new ObjectId(user.userId) });
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has sufficient balance
    if (userData.balance < allocationAmount) {
      return NextResponse.json(
        { error: `Insufficient balance. Your balance: $${userData.balance.toFixed(2)}` },
        { status: 400 }
      );
    }

    // Check if user already has an active copy trading
    const existingCopyTrading = await getUserActiveCopyTrading(user.userId);
    
    if (existingCopyTrading) {
      return NextResponse.json(
        { error: 'You already have an active copy trading. Please stop it first.' },
        { status: 400 }
      );
    }

    // Get trader data
    const trader = await getCopyTraderById(traderId);
    
    if (!trader) {
      return NextResponse.json(
        { error: 'Trader not found' },
        { status: 404 }
      );
    }

    // Deduct allocation amount from user balance
    const session = client.startSession();
    
    try {
      let copyTradingId = '';
      
      await session.withTransaction(async () => {
        console.log('📝 [Copy Trading Start] Creating copy trading record...');
        
        // Create copy trading record
        const result = await createUserCopyTrading({
          userId: new ObjectId(user.userId),
          traderId: new ObjectId(traderId),
          traderName: trader.name,
          allocatedAmount: allocationAmount,
          startDate: new Date(),
          status: 'active',
        });
        
        copyTradingId = result.insertedId.toString();
        console.log('✅ [Copy Trading Start] Copy trading record created:', copyTradingId);

        console.log('💰 [Copy Trading Start] Deducting balance...');
        console.log(`   Current Balance: $${userData.balance}`);
        console.log(`   Deducting: $${allocationAmount}`);
        
        // Deduct amount from user balance
        const balanceUpdate = await usersCollection.updateOne(
          { _id: new ObjectId(user.userId) },
          {
            $inc: { balance: -allocationAmount },
            $set: { updatedAt: new Date() },
          },
          { session }
        );
        
        console.log('✅ [Copy Trading Start] Balance updated:', balanceUpdate.modifiedCount > 0 ? 'SUCCESS' : 'FAILED');

        // Note: We don't update trader followers count because it's a display string ("2.4k")
        // not a numeric counter that can be incremented/decremented
      });

      await session.endSession();
      
      const newBalance = userData.balance - allocationAmount;

      console.log('✅ [Copy Trading Start] Transaction Complete!');
      console.log(`   Allocated: $${allocationAmount}`);
      console.log(`   Old Balance: $${userData.balance.toFixed(2)}`);
      console.log(`   New Balance: $${newBalance.toFixed(2)}`);
      console.log(`   Copy Trading ID: ${copyTradingId}`);

      return NextResponse.json({
        success: true,
        message: 'Copy trading started successfully',
        newBalance: newBalance,
        allocatedAmount: allocationAmount,
      });

    } catch (error) {
      await session.endSession();
      throw error;
    }

  } catch (error) {
    console.error('❌ [Copy Trading Start] Error:', error);
    return NextResponse.json(
      { error: 'Failed to start copy trading' },
      { status: 500 }
    );
  }
}
