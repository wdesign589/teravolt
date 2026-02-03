import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { UserDocument } from '@/lib/models/User';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    // Find user with this verification token
    const user = await usersCollection.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }
    
    // Update user to mark email as verified
    const result = await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerified: true,
          updatedAt: new Date(),
        },
        $unset: {
          emailVerificationToken: '',
          emailVerificationExpires: '',
        },
      }
    );
    
    if (!result.acknowledged) {
      return NextResponse.json(
        { error: 'Failed to verify email' },
        { status: 500 }
      );
    }
    
    // Create JWT token for auto-login
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    const authToken = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Prepare user data for response
    const userResponse = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      kycStatus: user.kycStatus,
      emailVerified: true, // Now verified
      balance: user.balance,
      createdAt: user.createdAt,
    };
    
    // Create response with user data
    const response = NextResponse.json(
      {
        success: true,
        message: 'Email verified successfully! You can now access all features.',
        user: userResponse,
        token: authToken,
      },
      { status: 200 }
    );
    
    // Set HTTP-only cookie for token
    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
    
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during verification' },
      { status: 500 }
    );
  }
}
