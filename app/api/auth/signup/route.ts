import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { createUserDocument, validateUserData, UserDocument } from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/smtp';
import { VerificationEmail } from '@/emails/VerificationEmail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = validateUserData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }
    
    // Check if passwords match
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }
    
    // Connect to database
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: body.email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    
    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Create user document
    const userDoc = createUserDocument({
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone.trim(),
      dateOfBirth: body.dateOfBirth,
      address: body.address.trim(),
      city: body.city.trim(),
      postalCode: body.postalCode.trim(),
      country: body.country,
      investmentAmount: body.investmentAmount,
      investmentExperience: body.investmentExperience,
      investmentGoal: body.investmentGoal,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });
    
    // Insert user into database
    const result = await usersCollection.insertOne(userDoc as any);
    
    if (!result.acknowledged) {
      return NextResponse.json(
        { error: 'Failed to create account. Please try again.' },
        { status: 500 }
      );
    }
    
    // Send verification email via SMTP
    try {
      const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;
      
      await sendEmail({
        to: body.email.toLowerCase().trim(),
        subject: 'Verify your Lunex account',
        react: VerificationEmail({
          firstName: body.firstName,
          verificationLink,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail the signup if email fails
    }
    
    // Return success without auto-login - user must verify email first
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.',
        email: userDoc.email,
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup. Please try again.' },
      { status: 500 }
    );
  }
}
