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

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const transactionsCollection = db.collection<Transaction>('transactions');

    // Fetch withdrawal transactions with user info
    const withdrawals = await transactionsCollection.aggregate([
      {
        $match: {
          type: 'withdrawal',
          status: status,
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $unwind: '$userInfo'
      },
      {
        $project: {
          _id: 1,
          userId: {
            _id: '$userInfo._id',
            firstName: '$userInfo.firstName',
            lastName: '$userInfo.lastName',
            email: '$userInfo.email',
          },
          amount: 1,
          status: 1,
          description: 1,
          walletAddress: 1,
          walletSymbol: 1,
          bankDetails: 1,
          paypalEmail: 1,
          adminNotes: 1,
          createdAt: 1,
          balanceBefore: 1,
          balanceAfter: 1,
          approvedBy: 1,
          approvedAt: 1,
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]).toArray();

    return NextResponse.json({
      success: true,
      withdrawals,
    });

  } catch (error) {
    console.error('❌ [Admin Withdrawals] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch withdrawals' },
      { status: 500 }
    );
  }
}
