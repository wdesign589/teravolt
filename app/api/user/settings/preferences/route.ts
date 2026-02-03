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

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { currency, timezone, language } = await request.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');

    // Update user preferences
    await usersCollection.updateOne(
      { _id: new ObjectId(user.userId) },
      {
        $set: {
          'preferences.currency': currency,
          'preferences.timezone': timezone,
          'preferences.language': language,
          updatedAt: new Date(),
        },
      }
    );

    console.log('✅ [Preferences] Updated for user:', user.userId);

    return NextResponse.json({
      success: true,
      message: 'Preferences updated',
    });

  } catch (error) {
    console.error('❌ [Preferences] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}
