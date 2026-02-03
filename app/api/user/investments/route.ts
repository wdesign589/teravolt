import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import {
  InvestmentPlan,
  UserInvestment,
  createUserInvestmentDocument,
} from '@/lib/models/Investment';
import { UserDocument } from '@/lib/models/User';
import { createTransaction } from '@/lib/helpers/transactions';

/**
 * GET /api/user/investments
 * Get user's investments
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
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

    const db = await getDatabase();
    const investments = await db
      .collection<UserInvestment>('userInvestments')
      .find({ userId: new ObjectId(decoded.userId) })
      .sort({ createdAt: -1 })
      .toArray();

    const serializedInvestments = investments.map((inv) => ({
      ...inv,
      _id: inv._id?.toString(),
      userId: inv.userId.toString(),
      investmentPlanId: inv.investmentPlanId.toString(),
      startDate: inv.startDate.toISOString(),
      endDate: inv.endDate.toISOString(),
      completedAt: inv.completedAt?.toISOString(),
      lastProfitDistribution: inv.lastProfitDistribution?.toISOString(),
      nextProfitDistribution: inv.nextProfitDistribution?.toISOString(),
      createdAt: inv.createdAt.toISOString(),
      updatedAt: inv.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      investments: serializedInvestments,
    });
  } catch (error) {
    console.error('Error fetching user investments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/investments
 * Create new user investment
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
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

    const body = await request.json();
    const { investmentPlanId, amount } = body;

    if (!investmentPlanId || !amount) {
      return NextResponse.json(
        { error: 'Investment plan ID and amount are required' },
        { status: 400 }
      );
    }

    const investmentAmount = Number(amount);
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid investment amount' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Get investment plan
    const plan = await db
      .collection<InvestmentPlan>('investmentPlans')
      .findOne({ _id: new ObjectId(investmentPlanId), isActive: true });

    if (!plan) {
      return NextResponse.json(
        { error: 'Investment plan not found or inactive' },
        { status: 404 }
      );
    }

    // Validate amount range
    if (investmentAmount < plan.minimumAmount || investmentAmount > plan.maximumAmount) {
      return NextResponse.json(
        {
          error: `Investment amount must be between $${plan.minimumAmount} and $${plan.maximumAmount}`,
        },
        { status: 400 }
      );
    }

    // Get user and check balance
    const user = await db
      .collection<UserDocument>('users')
      .findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if ((user.balance || 0) < investmentAmount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Create user investment
    const userInvestment = createUserInvestmentDocument(
      new ObjectId(decoded.userId),
      plan,
      investmentAmount
    );

    // Start transaction
    const session = db.client.startSession();
    
    let insertedId: ObjectId;
    const balanceBefore = user.balance || 0;
    const balanceAfter = balanceBefore - investmentAmount;
    const now = new Date();
    
    try {
      await session.withTransaction(async () => {
        // Insert investment
        const result = await db.collection('userInvestments').insertOne(userInvestment, { session });
        insertedId = result.insertedId;

        // Deduct from user balance
        await db.collection('users').updateOne(
          { _id: new ObjectId(decoded.userId) },
          {
            $inc: { balance: -investmentAmount, totalInvestments: investmentAmount },
            $set: { updatedAt: now },
          },
          { session }
        );

        // Create transaction record
        await createTransaction(db, {
          userId: new ObjectId(decoded.userId),
          type: 'investment',
          amount: investmentAmount,
          status: 'completed',
          description: `Investment created: ${plan.name}. $${investmentAmount.toFixed(2)} deducted from balance.`,
          investmentId: insertedId,
          investmentPlanName: plan.name,
          balanceBefore,
          balanceAfter,
          session,
        });
      });

      await session.endSession();

      return NextResponse.json({
        success: true,
        message: 'Investment created successfully',
        investmentId: insertedId!.toString(),
      });
    } catch (error) {
      await session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json(
      { error: 'Failed to create investment' },
      { status: 500 }
    );
  }
}
