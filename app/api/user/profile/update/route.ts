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

    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address,
      city,
      postalCode,
      country,
    } = await request.json();

    // Validation
    if (!firstName || !lastName || !phone || !dateOfBirth || !address || !city || !postalCode || !country) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection('users');

    // Update user profile
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(user.userId) },
      {
        $set: {
          firstName,
          lastName,
          phone,
          dateOfBirth: new Date(dateOfBirth),
          address,
          city,
          postalCode,
          country,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('✅ [Profile Update] User profile updated:', user.userId);

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });

  } catch (error) {
    console.error('❌ [Profile Update] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
