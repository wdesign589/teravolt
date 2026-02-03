import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const db = await getDatabase();
    
    // Fetch all user investments with user details
    const investments = await db
      .collection('userInvestments')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            investmentPlanId: 1,
            investmentPlanName: 1,
            amount: 1,
            expectedReturn: 1,
            dailyProfit: 1,
            totalProfit: 1,
            status: 1,
            startDate: 1,
            endDate: 1,
            completedAt: 1,
            durationDays: 1,
            percentageReturn: 1,
            createdAt: 1,
            profitDistributions: 1,
            'user.firstName': 1,
            'user.lastName': 1,
            'user.email': 1,
            'user.balance': 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    // Calculate summary statistics
    const stats = {
      totalInvestments: investments.length,
      activeInvestments: investments.filter((inv: any) => inv.status === 'active').length,
      completedInvestments: investments.filter((inv: any) => inv.status === 'completed').length,
      totalInvestedAmount: investments.reduce((sum: number, inv: any) => sum + inv.amount, 0),
      totalProfitDistributed: investments.reduce((sum: number, inv: any) => sum + inv.totalProfit, 0),
      totalExpectedReturns: investments.reduce((sum: number, inv: any) => sum + inv.expectedReturn, 0),
    };

    // Serialize data
    const serializedInvestments = investments.map((inv: any) => ({
      ...inv,
      _id: inv._id.toString(),
      userId: inv.userId.toString(),
      investmentPlanId: inv.investmentPlanId.toString(),
      startDate: inv.startDate.toISOString(),
      endDate: inv.endDate.toISOString(),
      completedAt: inv.completedAt ? inv.completedAt.toISOString() : null,
      createdAt: inv.createdAt.toISOString(),
      profitDistributions: inv.profitDistributions?.map((dist: any) => ({
        ...dist,
        date: dist.date.toISOString(),
      })) || [],
    }));

    return NextResponse.json({
      investments: serializedInvestments,
      stats,
    });
  } catch (error) {
    console.error('Error fetching client investments:', error);
    return NextResponse.json({ error: 'Failed to fetch client investments' }, { status: 500 });
  }
}
