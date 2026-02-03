import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getActiveCopyTraders } from '@/lib/models/CopyTrader';
import { getUserActiveCopyTrading } from '@/lib/models/UserCopyTrading';

const JWT_SECRET = process.env.JWT_SECRET || '';

// Verify user authentication
async function verifyUser(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// GET: Fetch all active copy traders (user endpoint)
export async function GET(request: NextRequest) {
  console.log('🔵 [API] /api/copy-traders called');
  
  try {
    console.log('🔐 [API] Verifying user...');
    const user = await verifyUser(request);
    
    if (!user) {
      console.log('❌ [API] User not authenticated');
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }
    
    console.log('✅ [API] User authenticated:', user.userId);

    // Get all active traders
    console.log('📊 [API] Fetching active traders from database...');
    const traders = await getActiveCopyTraders();
    console.log('📈 [API] Found', traders.length, 'active traders');

    // Get user's active copy trading (if any)
    console.log('🔍 [API] Checking user active copy trading...');
    const activeCopyTrading = await getUserActiveCopyTrading(user.userId);
    console.log('📋 [API] User active copy trading:', activeCopyTrading ? 'Found' : 'None');

    // Format traders for frontend (exclude percentageGainPerDay)
    const formattedTraders = traders.map(trader => ({
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
      // DO NOT include percentageGainPerDay - it's admin only
    }));

    console.log('✅ [API] Sending response with', formattedTraders.length, 'traders');
    
    return NextResponse.json({
      success: true,
      traders: formattedTraders,
      userActiveCopyTrading: activeCopyTrading ? {
        traderId: activeCopyTrading.traderId.toString(),
        traderName: activeCopyTrading.traderName,
        allocatedAmount: activeCopyTrading.allocatedAmount,
        totalEarned: activeCopyTrading.totalEarned,
        startDate: activeCopyTrading.startDate,
      } : null,
    });
  } catch (error) {
    console.error('❌ [API] Error fetching copy traders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch copy traders' },
      { status: 500 }
    );
  }
}
