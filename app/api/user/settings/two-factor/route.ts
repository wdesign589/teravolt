import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';

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

    const { enabled } = await request.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');

    // Update two-factor authentication setting
    await usersCollection.updateOne(
      { _id: new ObjectId(user.userId) },
      {
        $set: {
          twoFactorEnabled: enabled,
          updatedAt: new Date(),
        },
      }
    );

    console.log(`✅ [Two-Factor Auth] ${enabled ? 'Enabled' : 'Disabled'} for user:`, user.userId);

    return NextResponse.json({
      success: true,
      message: `Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`,
    });

  } catch (error) {
    console.error('❌ [Two-Factor Auth] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update two-factor authentication' },
      { status: 500 }
    );
  }
}
