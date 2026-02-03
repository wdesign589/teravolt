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

    const { depositId, reason } = await request.json();

    if (!depositId || !reason) {
      return NextResponse.json(
        { error: 'Deposit ID and reason are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const transactionsCollection = db.collection<Transaction>('transactions');

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

    // Update transaction status to rejected
    await transactionsCollection.updateOne(
      { _id: new ObjectId(depositId) },
      {
        $set: {
          status: 'rejected',
          adminNotes: reason,
          approvedBy: new ObjectId(admin.userId),
          approvedAt: new Date(),
          updatedAt: new Date(),
          description: `Deposit: ${deposit.walletSymbol} - Rejected`,
        }
      }
    );

    console.log('✅ [Admin] Deposit rejected:', depositId);

    return NextResponse.json({
      success: true,
      message: 'Deposit rejected successfully',
    });

  } catch (error) {
    console.error('❌ [Admin Deposit Reject] Error:', error);
    return NextResponse.json(
      { error: 'Failed to reject deposit' },
      { status: 500 }
    );
  }
}
