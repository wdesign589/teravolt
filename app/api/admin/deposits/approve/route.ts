import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';
import { Transaction } from '@/lib/models/Transaction';

const JWT_SECRET = process.env.JWT_SECRET || '';

async function verifyAdmin(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Check if user is admin
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    
    if (!user || user.role !== 'admin') {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { depositId } = await request.json();

    if (!depositId) {
      return NextResponse.json(
        { error: 'Deposit ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const transactionsCollection = db.collection<Transaction>('transactions');
    const usersCollection = db.collection('users');

    // Get deposit transaction
    const deposit = await transactionsCollection.findOne({
      _id: new ObjectId(depositId),
      type: 'deposit',
      status: 'pending',
    });

    if (!deposit) {
      return NextResponse.json(
        { error: 'Deposit not found or already processed' },
        { status: 404 }
      );
    }

    // Get user
    const user = await usersCollection.findOne({ _id: deposit.userId });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('📊 [Deposit Approve] Current user balance:', user.balance);
    console.log('📊 [Deposit Approve] Deposit amount:', deposit.amount);
    console.log('📊 [Deposit Approve] User ID:', deposit.userId.toString());

    const currentBalance = user.balance || 0;
    const newBalance = currentBalance + deposit.amount;

    console.log('📊 [Deposit Approve] Calculated new balance:', newBalance);

    // Try with transaction first, fallback to sequential updates if transactions not supported
    let session;
    let useTransaction = true;

    try {
      session = client.startSession();
    } catch (error) {
      console.log('⚠️ [Deposit Approve] Transactions not supported, using sequential updates');
      useTransaction = false;
    }
    
    try {
      if (useTransaction && session) {
        // Use transaction
        await session.withTransaction(async () => {
          // Update user balance
          const updateResult = await usersCollection.updateOne(
            { _id: deposit.userId },
            {
              $inc: { balance: deposit.amount },
              $set: { updatedAt: new Date() }
            },
            { session }
          );

          console.log('✅ [Deposit Approve] User update result:', {
            matchedCount: updateResult.matchedCount,
            modifiedCount: updateResult.modifiedCount,
          });

          if (updateResult.matchedCount === 0) {
            throw new Error('User not found during balance update');
          }

          // Update transaction status
          const txUpdateResult = await transactionsCollection.updateOne(
            { _id: new ObjectId(depositId) },
            {
              $set: {
                status: 'completed',
                balanceAfter: newBalance,
                approvedBy: new ObjectId(admin.userId),
                approvedAt: new Date(),
                updatedAt: new Date(),
                description: `Deposit: ${deposit.walletSymbol} - Approved`,
              }
            },
            { session }
          );

          console.log('✅ [Deposit Approve] Transaction update result:', {
            matchedCount: txUpdateResult.matchedCount,
            modifiedCount: txUpdateResult.modifiedCount,
          });
        });

        await session.endSession();
      } else {
        // Fallback: Sequential updates without transaction
        console.log('⚠️ [Deposit Approve] Using sequential updates (no transaction support)');
        
        // Update user balance
        const updateResult = await usersCollection.updateOne(
          { _id: deposit.userId },
          {
            $inc: { balance: deposit.amount },
            $set: { updatedAt: new Date() }
          }
        );

        console.log('✅ [Deposit Approve] User update result:', {
          matchedCount: updateResult.matchedCount,
          modifiedCount: updateResult.modifiedCount,
        });

        if (updateResult.matchedCount === 0) {
          throw new Error('User not found during balance update');
        }

        // Update transaction status
        const txUpdateResult = await transactionsCollection.updateOne(
          { _id: new ObjectId(depositId) },
          {
            $set: {
              status: 'completed',
              balanceAfter: newBalance,
              approvedBy: new ObjectId(admin.userId),
              approvedAt: new Date(),
              updatedAt: new Date(),
              description: `Deposit: ${deposit.walletSymbol} - Approved`,
            }
          }
        );

        console.log('✅ [Deposit Approve] Transaction update result:', {
          matchedCount: txUpdateResult.matchedCount,
          modifiedCount: txUpdateResult.modifiedCount,
        });
      }

      // Verify the update
      const updatedUser = await usersCollection.findOne({ _id: deposit.userId });
      console.log('✅ [Admin] Deposit approved:', depositId);
      console.log('✅ [Admin] User balance after approval:', updatedUser?.balance);

      return NextResponse.json({
        success: true,
        message: 'Deposit approved successfully',
        newBalance: updatedUser?.balance,
      });

    } catch (error) {
      if (session) {
        await session.endSession();
      }
      console.error('❌ [Deposit Approve] Transaction error:', error);
      throw error;
    }

  } catch (error) {
    console.error('❌ [Admin Deposit Approve] Error:', error);
    return NextResponse.json(
      { error: 'Failed to approve deposit' },
      { status: 500 }
    );
  }
}
