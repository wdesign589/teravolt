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

    const { withdrawalId } = await request.json();

    if (!withdrawalId) {
      return NextResponse.json(
        { error: 'Withdrawal ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const transactionsCollection = db.collection<Transaction>('transactions');

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

    console.log('✅ [Admin] Approving withdrawal:', withdrawalId);
    console.log(`   User: ${withdrawal.userId.toString()}`);
    console.log(`   Amount: $${withdrawal.amount}`);

    // Update transaction status to completed
    // Note: Balance was already deducted when user submitted, so no balance change needed
    await transactionsCollection.updateOne(
      { _id: new ObjectId(withdrawalId) },
      {
        $set: {
          status: 'completed',
          approvedBy: new ObjectId(admin.userId),
          approvedAt: new Date(),
          updatedAt: new Date(),
          description: withdrawal.description.replace('Pending Admin Approval', 'Approved'),
        }
      }
    );

    console.log('✅ [Admin] Withdrawal approved successfully');

    return NextResponse.json({
      success: true,
      message: 'Withdrawal approved successfully',
    });

  } catch (error) {
    console.error('❌ [Admin Withdrawal Approve] Error:', error);
    return NextResponse.json(
      { error: 'Failed to approve withdrawal' },
      { status: 500 }
    );
  }
}
