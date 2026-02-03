import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { UserDocument } from '@/lib/models/User';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/smtp';
import { VerificationEmail } from '@/emails/VerificationEmail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    // Find user by email
    const user = await usersCollection.findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { success: true, message: 'If an account exists, a verification email has been sent.' },
        { status: 200 }
      );
    }
    
    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      );
    }
    
    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Update user with new token
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerificationToken: verificationToken,
          emailVerificationExpires: verificationExpires,
          updatedAt: new Date(),
        },
      }
    );
    
    // Send verification email
    try {
      const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;
      
      await sendEmail({
        to: user.email,
        subject: 'Verify your Lunex account',
        react: VerificationEmail({
          firstName: user.firstName,
          verificationLink,
        }),
      });
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Verification email sent successfully! Please check your inbox.' 
        },
        { status: 200 }
      );
      
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again later.' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
