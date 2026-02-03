import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { UserDocument } from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    
    // Get stats
    const totalUsers = await usersCollection.countDocuments({ role: 'user' });
    const verifiedUsers = await usersCollection.countDocuments({ 
      role: 'user',
      emailVerified: true 
    });
    const pendingKYC = await usersCollection.countDocuments({ 
      role: 'user',
      kycStatus: 'pending' 
    });
    
    // Calculate total balance
    const balanceResult = await usersCollection.aggregate([
      { $match: { role: 'user' } },
      { $group: { _id: null, total: { $sum: '$balance' } } }
    ]).toArray();
    
    const totalBalance = balanceResult.length > 0 ? balanceResult[0].total : 0;
    
    return NextResponse.json({
      totalUsers,
      verifiedUsers,
      pendingKYC,
      totalBalance,
    });
    
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
