import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';

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

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const transactionsCollection = db.collection('transactions');

    console.log('🔧 [Fix Transactions] Starting migration...');

    // Find all deposit transactions that are actually copy trading returns
    // (they won't have walletSymbol and description contains "Copy Trading")
    const result = await transactionsCollection.updateMany(
      {
        type: 'deposit',
        walletSymbol: { $exists: false },
        description: { $regex: /Copy Trading/i }
      },
      {
        $set: {
          type: 'copy_trading_return',
          updatedAt: new Date()
        }
      }
    );

    console.log('✅ [Fix Transactions] Migration completed!');
    console.log(`   Matched: ${result.matchedCount} documents`);
    console.log(`   Modified: ${result.modifiedCount} documents`);

    return NextResponse.json({
      success: true,
      message: 'Copy trading transactions reclassified successfully',
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });

  } catch (error) {
    console.error('❌ [Fix Transactions] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fix transactions' },
      { status: 500 }
    );
  }
}
