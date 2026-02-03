import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';
import { Transaction } from '@/lib/models/Transaction';

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
    const user = await verifyUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { walletSymbol, transactionHash, amount, proofUrl } = await request.json();

    // Validation
    if (!walletSymbol || !transactionHash || !amount || !proofUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const transactionsCollection = db.collection<Transaction>('transactions');
    const usersCollection = db.collection('users');

    // Get user current balance
    const userData = await usersCollection.findOne({ _id: new ObjectId(user.userId) });
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const currentBalance = userData.balance;

    // Create pending transaction
    const transaction: Transaction = {
      userId: new ObjectId(user.userId),
      type: 'deposit',
      amount: amount,
      status: 'pending',
      description: `Deposit: ${walletSymbol} - Pending Approval`,
      transactionHash,
      proofUrl,
      walletSymbol,
      balanceBefore: currentBalance,
      balanceAfter: currentBalance, // Will be updated when approved
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await transactionsCollection.insertOne(transaction);

    console.log('✅ [Deposit Submit] Transaction created:', result.insertedId.toString());

    return NextResponse.json({
      success: true,
      message: 'Deposit submitted successfully. Awaiting admin approval.',
      transactionId: result.insertedId.toString(),
    });

  } catch (error) {
    console.error('❌ [Deposit Submit] Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit deposit' },
      { status: 500 }
    );
  }
}
