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

    const { emailNotifications, transactionAlerts, investmentUpdates, marketingEmails } = await request.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');

    // Update notification preferences
    await usersCollection.updateOne(
      { _id: new ObjectId(user.userId) },
      {
        $set: {
          'notificationSettings.emailNotifications': emailNotifications,
          'notificationSettings.transactionAlerts': transactionAlerts,
          'notificationSettings.investmentUpdates': investmentUpdates,
          'notificationSettings.marketingEmails': marketingEmails,
          updatedAt: new Date(),
        },
      }
    );

    console.log('✅ [Notification Settings] Updated for user:', user.userId);

    return NextResponse.json({
      success: true,
      message: 'Notification preferences updated',
    });

  } catch (error) {
    console.error('❌ [Notification Settings] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update notification preferences' },
      { status: 500 }
    );
  }
}
