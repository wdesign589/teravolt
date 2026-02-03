import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { UserDocument } from '@/lib/models/User';

// Get all users
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    // Get all users except admins
    const users = await usersCollection
      .find({ role: 'user' })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Format user data
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
      role: user.role,
      kycStatus: user.kycStatus,
      emailVerified: user.emailVerified,
      balance: user.balance,
      walletAddress: user.walletAddress,
      avatar: user.avatar,
      investmentAmount: user.investmentAmount,
      investmentExperience: user.investmentExperience,
      investmentGoal: user.investmentGoal,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    }));
    
    return NextResponse.json({ users: formattedUsers });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
