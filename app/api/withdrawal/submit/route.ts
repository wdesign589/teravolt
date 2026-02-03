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

    const { amount, method, walletAddress, cryptocurrency, bankDetails, paypalEmail } = await request.json();

    // Validation
    if (!amount || !method) {
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
    const usersCollection = db.collection('users');
    const transactionsCollection = db.collection<Transaction>('transactions');

    // Get user current balance
    const userData = await usersCollection.findOne({ _id: new ObjectId(user.userId) });
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const currentBalance = userData.balance || 0;

    // Check if user has sufficient balance
    if (amount > currentBalance) {
      return NextResponse.json(
        { error: `Insufficient balance. Your available balance is $${currentBalance.toFixed(2)}` },
        { status: 400 }
      );
    }

    console.log('💸 [Withdrawal Submit] Processing withdrawal...');
    console.log(`   User: ${user.userId}`);
    console.log(`   Amount: $${amount}`);
    console.log(`   Current Balance: $${currentBalance}`);
    console.log(`   Method: ${method}`);

    // Calculate new balance (deduct immediately)
    const newBalance = currentBalance - amount;

    // Prepare withdrawal details based on method
    let description = '';
    let withdrawalDetails: any = {};

    if (method === 'crypto') {
      if (!walletAddress || !cryptocurrency) {
        return NextResponse.json(
          { error: 'Wallet address and cryptocurrency are required' },
          { status: 400 }
        );
      }
      description = `Withdrawal: ${cryptocurrency} - Pending Admin Approval`;
      withdrawalDetails = {
        walletAddress,
        walletSymbol: cryptocurrency,
      };
    } else if (method === 'bank') {
      if (!bankDetails || !bankDetails.accountNumber || !bankDetails.bankName) {
        return NextResponse.json(
          { error: 'Complete bank details are required' },
          { status: 400 }
        );
      }
      description = `Withdrawal: Bank Transfer - Pending Admin Approval`;
      withdrawalDetails = {
        bankDetails: JSON.stringify(bankDetails),
      };
    } else if (method === 'paypal') {
      if (!paypalEmail) {
        return NextResponse.json(
          { error: 'PayPal email is required' },
          { status: 400 }
        );
      }
      description = `Withdrawal: PayPal - Pending Admin Approval`;
      withdrawalDetails = {
        paypalEmail,
      };
    } else {
      return NextResponse.json(
        { error: 'Invalid withdrawal method' },
        { status: 400 }
      );
    }

    // Start session for transaction
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // 1. Deduct balance immediately
        const updateResult = await usersCollection.updateOne(
          { _id: new ObjectId(user.userId) },
          {
            $inc: { balance: -amount },
            $set: { updatedAt: new Date() }
          },
          { session }
        );

        console.log('✅ [Withdrawal] Balance deducted:', {
          matched: updateResult.matchedCount,
          modified: updateResult.modifiedCount,
          newBalance
        });

        if (updateResult.matchedCount === 0) {
          throw new Error('User not found during balance update');
        }

        // 2. Create pending withdrawal transaction
        const transaction: any = {
          userId: new ObjectId(user.userId),
          type: 'withdrawal',
          amount: amount,
          status: 'pending',
          description,
          balanceBefore: currentBalance,
          balanceAfter: newBalance,
          ...withdrawalDetails,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const txResult = await transactionsCollection.insertOne(transaction, { session });
        
        console.log('✅ [Withdrawal] Transaction created:', txResult.insertedId.toString());
      });

      await session.endSession();

      console.log('✅ [Withdrawal Submit] Complete! Balance deducted, awaiting admin approval.');

      return NextResponse.json({
        success: true,
        message: 'Withdrawal request submitted successfully. Balance has been deducted.',
        newBalance,
      });

    } catch (error) {
      await session.endSession();
      console.error('❌ [Withdrawal Submit] Transaction failed:', error);
      throw error;
    }

  } catch (error) {
    console.error('❌ [Withdrawal Submit] Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit withdrawal' },
      { status: 500 }
    );
  }
}
