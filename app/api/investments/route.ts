import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { InvestmentPlan } from '@/lib/models/Investment';

/**
 * GET /api/investments
 * Get all active investment plans (public/user-facing)
 */
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const investments = await db
      .collection<InvestmentPlan>('investmentPlans')
      .find({ isActive: true })
      .sort({ minimumAmount: 1 }) // Sort by minimum amount ascending
      .toArray();

    // Convert ObjectId to string for JSON serialization
    const serializedInvestments = investments.map((inv) => ({
      id: inv._id?.toString(),
      name: inv.name,
      description: inv.description,
      minimumAmount: inv.minimumAmount,
      maximumAmount: inv.maximumAmount,
      durationDays: inv.durationDays,
      percentageReturn: inv.percentageReturn,
      dailyReturn: inv.dailyReturn,
      features: inv.features,
      risk: inv.risk,
      category: inv.category,
    }));

    return NextResponse.json({
      success: true,
      investments: serializedInvestments,
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}
