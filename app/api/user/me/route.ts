import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { UserDocument } from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getActiveCopyTraders } from '@/lib/models/CopyTrader';
import { getUserActiveCopyTrading } from '@/lib/models/UserCopyTrading';

/**
 * GET /api/user/me
 * Fetch complete user data for the authenticated user
 * This is called after login to populate Zustand state
 */
export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify token
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Connect to database
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    // Fetch complete user data
    const user = await usersCollection.findOne({ 
      _id: new ObjectId(decoded.userId) 
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Fetch copy trading data
    const [copyTraders, userActiveCopyTrading] = await Promise.all([
      getActiveCopyTraders(),
      getUserActiveCopyTrading(decoded.userId),
    ]);

    // Format copy traders (exclude percentageGainPerDay - admin only)
    const formattedCopyTraders = copyTraders.map(trader => ({
      id: trader._id?.toString(),
      name: trader.name,
      avatar: trader.avatar,
      roi: `+${trader.roi}%`,
      followers: trader.followers,
      winRate: `${trader.winRate}%`,
      trades: trader.trades,
      badge: trader.badge,
      risk: trader.risk,
      avgProfit: `+$${trader.avgProfit}`,
      totalReturn: `$${trader.totalReturn.toLocaleString()}`,
      monthlyReturn: `+${trader.monthlyReturn}%`,
    }));

    // Prepare complete user data (exclude password)
    const userData = {
      id: user._id.toString(),
      // Personal Information
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      avatar: user.avatar,
      
      // Address Information
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
      
      // Account Information
      role: user.role,
      kycStatus: user.kycStatus,
      emailVerified: user.emailVerified,
      
      // Financial Information
      balance: user.balance,
      walletAddress: user.walletAddress,
      
      // Investment Preferences
      investmentAmount: user.investmentAmount,
      investmentExperience: user.investmentExperience,
      investmentGoal: user.investmentGoal,
      
      // Dashboard Statistics
      totalIncome: user.totalIncome ?? 0,
      totalSpent: user.totalSpent ?? 0,
      totalInvestments: user.totalInvestments ?? 0,
      totalProfit: user.totalProfit ?? 0,
      totalDeposits: user.totalDeposits ?? 0,
      totalWithdrawals: user.totalWithdrawals ?? 0,
      
      // Copy Trading Data
      copyTraders: formattedCopyTraders,
      activeCopyTrading: userActiveCopyTrading ? {
        traderId: userActiveCopyTrading.traderId.toString(),
        traderName: userActiveCopyTrading.traderName,
        allocatedAmount: userActiveCopyTrading.allocatedAmount,
        totalEarned: userActiveCopyTrading.totalEarned,
        startDate: userActiveCopyTrading.startDate,
      } : null,
      
      // Timestamps
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
      
      // Future: Add more fields here as they're added to the schema
      // For example:
      // transactions: user.transactions,
      // referralCode: user.referralCode,
    };
    
    return NextResponse.json({ user: userData });
    
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
