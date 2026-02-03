import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { Transaction } from '@/lib/models/Transaction';

/**
 * GET /api/user/transactions
 * Get user's transactions with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const { searchParams } = new URL(request.url);
    
    // Optional filters
    const type = searchParams.get('type'); // deposit, withdrawal, investment, investment_return, investment_completion
    const status = searchParams.get('status'); // pending, completed, failed
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Build query
    const query: any = { userId: new ObjectId(decoded.userId) };
    
    if (type) {
      query.type = type;
    }
    
    if (status) {
      query.status = status;
    }

    // Get transactions
    const transactions = await db
      .collection<Transaction>('transactions')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count
    const totalCount = await db
      .collection<Transaction>('transactions')
      .countDocuments(query);

    const serializedTransactions = transactions.map((tx) => ({
      ...tx,
      _id: tx._id?.toString(),
      userId: tx.userId.toString(),
      investmentId: tx.investmentId?.toString(),
    }));

    return NextResponse.json({
      transactions: serializedTransactions,
      totalCount,
      hasMore: skip + transactions.length < totalCount,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/transactions
 * Create a new transaction (for deposits, withdrawals, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, amount, description, status = 'pending', investmentId, investmentPlanName } = body;

    // Validate required fields
    if (!type || !amount || !description) {
      return NextResponse.json(
        { error: 'Type, amount, and description are required' },
        { status: 400 }
      );
    }

    // Validate transaction type
    const validTypes = ['deposit', 'withdrawal', 'investment', 'investment_return', 'investment_completion'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid transaction type' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'completed', 'failed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid transaction status' },
        { status: 400 }
      );
    }

    const transactionAmount = Number(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid transaction amount' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Get user's current balance
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const balanceBefore = user.balance || 0;
    let balanceAfter = balanceBefore;
    const now = new Date();

    // Start transaction session
    const session = db.client.startSession();
    let transactionId: ObjectId;

    try {
      await session.withTransaction(async () => {
        // Calculate balance after based on transaction type (only if status is completed)
        if (status === 'completed') {
          switch (type) {
            case 'deposit':
              balanceAfter = balanceBefore + transactionAmount;
              // Update user balance
              await db.collection('users').updateOne(
                { _id: new ObjectId(decoded.userId) },
                {
                  $inc: { balance: transactionAmount },
                  $set: { updatedAt: now },
                },
                { session }
              );
              break;
              
            case 'withdrawal':
              if (balanceBefore < transactionAmount) {
                throw new Error('Insufficient balance for withdrawal');
              }
              balanceAfter = balanceBefore - transactionAmount;
              // Update user balance
              await db.collection('users').updateOne(
                { _id: new ObjectId(decoded.userId) },
                {
                  $inc: { balance: -transactionAmount },
                  $set: { updatedAt: now },
                },
                { session }
              );
              break;
              
            // For investment-related transactions, balance is handled elsewhere
            case 'investment':
            case 'investment_return':
            case 'investment_completion':
              // Balance changes are handled by the investment creation and profit distribution scripts
              break;
          }
        }

        // Create transaction record
        const transactionDoc: Omit<Transaction, '_id'> = {
          userId: new ObjectId(decoded.userId),
          type: type as Transaction['type'],
          amount: transactionAmount,
          status: status as Transaction['status'],
          description,
          balanceBefore,
          balanceAfter,
          createdAt: now,
          updatedAt: now,
        };

        // Add optional investment fields if provided
        if (investmentId) {
          transactionDoc.investmentId = new ObjectId(investmentId);
        }
        if (investmentPlanName) {
          transactionDoc.investmentPlanName = investmentPlanName;
        }

        const result = await db.collection<Transaction>('transactions').insertOne(
          transactionDoc,
          { session }
        );
        
        transactionId = result.insertedId;
      });

      await session.endSession();

      return NextResponse.json({
        success: true,
        message: 'Transaction created successfully',
        transactionId: transactionId!.toString(),
        balanceAfter,
      });
    } catch (error: any) {
      await session.endSession();
      return NextResponse.json(
        { error: error.message || 'Failed to create transaction' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
