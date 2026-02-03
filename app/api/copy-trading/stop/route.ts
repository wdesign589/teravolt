import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';
import { getUserActiveCopyTrading, stopUserCopyTrading } from '@/lib/models/UserCopyTrading';
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
    console.log('🛑 [Copy Trading Stop] Request received');
    
    const user = await verifyUser(request);
    
    if (!user) {
      console.log('❌ [Copy Trading Stop] Unauthorized');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('📊 [Copy Trading Stop] User:', user.userId);

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection<UserDocument>('users');

    // Get user's active copy trading
    console.log('🔍 [Copy Trading Stop] Searching for active copy trading...');
    console.log('   User ID:', user.userId);
    
    const activeCopyTrading = await getUserActiveCopyTrading(user.userId);
    
    console.log('📊 [Copy Trading Stop] Query result:', activeCopyTrading ? 'FOUND' : 'NOT FOUND');
    
    if (!activeCopyTrading) {
      console.log('❌ [Copy Trading Stop] No active copy trading found');
      console.log('   Checking all copy trading records for user...');
      
      // Debug: Check all records for this user
      const allUserCopyTrading = await db.collection('userCopyTrading').find({ 
        userId: new ObjectId(user.userId) 
      }).toArray();
      
      console.log('   Total copy trading records:', allUserCopyTrading.length);
      if (allUserCopyTrading.length > 0) {
        console.log('   Records:', allUserCopyTrading.map(ct => ({
          id: ct._id?.toString(),
          trader: ct.traderName,
          status: ct.status,
          amount: ct.allocatedAmount
        })));
      }
      
      return NextResponse.json(
        { error: 'No active copy trading found' },
        { status: 404 }
      );
    }

    console.log('📊 [Copy Trading Stop] Active copy trading found');
    console.log('   Trader:', activeCopyTrading.traderName);
    console.log('   Allocated:', activeCopyTrading.allocatedAmount);

    // Get user data
    const userData = await usersCollection.findOne({ _id: new ObjectId(user.userId) });
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const currentBalance = userData.balance;
    const allocatedAmount = activeCopyTrading.allocatedAmount;
    const newBalance = currentBalance + allocatedAmount;

    console.log('💰 [Copy Trading Stop] Balance Info:');
    console.log(`   Current Balance: $${currentBalance.toFixed(2)}`);
    console.log(`   Returning: $${allocatedAmount.toFixed(2)}`);
    console.log(`   New Balance Will Be: $${newBalance.toFixed(2)}`);

    // Return allocated amount to user balance and stop copy trading
    const session = client.startSession();
    
    try {
      await session.withTransaction(async () => {
        console.log('🔄 [Copy Trading Stop] Transaction started...');
        
        // Step 1: Stop copy trading (set to inactive)
        console.log('📝 [Copy Trading Stop] Step 1: Stopping copy trading...');
        const stopResult = await stopUserCopyTrading(user.userId, session);
        console.log(`   ✅ Copy trading stopped. Modified: ${stopResult.modifiedCount}`);
        
        // CRITICAL: Check if copy trading was actually stopped
        if (stopResult.modifiedCount === 0) {
          console.log('⚠️ [Copy Trading Stop] No copy trading was stopped - already inactive!');
          throw new Error('Copy trading is already stopped or not found');
        }

        // Step 2: Return allocated amount to user balance
        console.log('📝 [Copy Trading Stop] Step 2: Updating balance...');
        const balanceResult = await usersCollection.updateOne(
          { _id: new ObjectId(user.userId) },
          {
            $inc: { balance: allocatedAmount },
            $set: { updatedAt: new Date() },
          },
          { session }
        );
        console.log(`   ✅ Balance updated. Modified: ${balanceResult.modifiedCount}`);

        // Note: We don't update trader followers count because it's a display string ("2.4k")
        // not a numeric counter that can be incremented/decremented

        // Step 3: Create transaction record
        console.log('📝 [Copy Trading Stop] Step 3: Creating transaction record...');
        const transactionResult = await db.collection('transactions').insertOne({
          userId: new ObjectId(user.userId),
          type: 'copy_trading_return',
          amount: allocatedAmount,
          status: 'completed',
          description: `Copy Trading Stopped: ${activeCopyTrading.traderName}. Allocated amount returned to balance.`,
          balanceBefore: currentBalance,
          balanceAfter: newBalance,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, { session });
        console.log(`   ✅ Transaction created. ID: ${transactionResult.insertedId.toString()}`);
      });

      await session.endSession();

      console.log('✅ [Copy Trading Stop] Transaction Complete!');
      console.log(`   Allocated Amount Returned: $${allocatedAmount.toFixed(2)}`);
      console.log(`   Old Balance: $${currentBalance.toFixed(2)}`);
      console.log(`   New Balance: $${newBalance.toFixed(2)}`);

      // Verify the balance was actually updated
      const verifyUser = await usersCollection.findOne({ _id: new ObjectId(user.userId) });
      console.log(`   📊 Verified Balance in DB: $${verifyUser?.balance.toFixed(2)}`);

      return NextResponse.json({
        success: true,
        message: 'Copy trading stopped successfully',
        newBalance: newBalance,
        amountReturned: allocatedAmount,
      });

    } catch (error) {
      await session.endSession();
      throw error;
    }

  } catch (error) {
    console.error('❌ [Copy Trading Stop] Error:', error);
    return NextResponse.json(
      { error: 'Failed to stop copy trading' },
      { status: 500 }
    );
  }
}
