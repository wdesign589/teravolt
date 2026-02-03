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

    const { withdrawalId, reason } = await request.json();

    if (!withdrawalId || !reason) {
      return NextResponse.json(
        { error: 'Withdrawal ID and reason are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const transactionsCollection = db.collection<Transaction>('transactions');
    const usersCollection = db.collection('users');

    // Get withdrawal transaction
    const withdrawal = await transactionsCollection.findOne({
      _id: new ObjectId(withdrawalId),
      type: 'withdrawal',
      status: 'pending',
    });

    if (!withdrawal) {
      return NextResponse.json(
        { error: 'Withdrawal not found or already processed' },
        { status: 404 }
      );
    }

    console.log('❌ [Admin] Rejecting withdrawal:', withdrawalId);
    console.log(`   User: ${withdrawal.userId.toString()}`);
    console.log(`   Amount to return: $${withdrawal.amount}`);
    console.log(`   Reason: ${reason}`);

    // Start session for transaction
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // 1. Return the funds to user's balance
        const updateResult = await usersCollection.updateOne(
          { _id: withdrawal.userId },
          {
            $inc: { balance: withdrawal.amount },
            $set: { updatedAt: new Date() }
          },
          { session }
        );

        console.log('✅ [Withdrawal Reject] Balance restored:', {
          matched: updateResult.matchedCount,
          modified: updateResult.modifiedCount,
        });

        if (updateResult.matchedCount === 0) {
          throw new Error('User not found during balance restoration');
        }

        // 2. Update transaction status to rejected
        await transactionsCollection.updateOne(
          { _id: new ObjectId(withdrawalId) },
          {
            $set: {
              status: 'rejected',
              adminNotes: reason,
              approvedBy: new ObjectId(admin.userId),
              approvedAt: new Date(),
              updatedAt: new Date(),
              description: withdrawal.description.replace('Pending Admin Approval', 'Rejected'),
              // Update balanceAfter to reflect returned funds
              balanceAfter: withdrawal.balanceBefore,
            }
          },
          { session }
        );

        console.log('✅ [Withdrawal Reject] Transaction marked as rejected');
      });

      await session.endSession();

      console.log('✅ [Admin] Withdrawal rejected and funds returned to user');

      return NextResponse.json({
        success: true,
        message: 'Withdrawal rejected successfully. Funds returned to user.',
      });

    } catch (error) {
      await session.endSession();
      console.error('❌ [Withdrawal Reject] Transaction failed:', error);
      throw error;
    }

  } catch (error) {
    console.error('❌ [Admin Withdrawal Reject] Error:', error);
    return NextResponse.json(
      { error: 'Failed to reject withdrawal' },
      { status: 500 }
    );
  }
}
