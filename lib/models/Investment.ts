import { ObjectId } from 'mongodb';

/**
 * Investment Plan Model
 * Represents investment plans created by admin
 */
export interface InvestmentPlan {
  _id?: ObjectId;
  name: string;
  description: string;
  minimumAmount: number;
  maximumAmount: number;
  durationDays: number;
  percentageReturn: number; // Total percentage return over duration
  dailyReturn: number; // Calculated daily return percentage
  isActive: boolean;
  features: string[]; // List of features/benefits
  risk: 'low' | 'medium' | 'high';
  category?: string; // e.g., 'Crypto', 'Forex', 'Stocks', etc.
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: ObjectId; // Admin user who created this
}

/**
 * User Investment Model
 * Represents individual user investments in plans
 */
export interface UserInvestment {
  _id?: ObjectId;
  userId: ObjectId;
  investmentPlanId: ObjectId;
  investmentPlanName: string; // Cached for easy access
  
  // Investment details
  amount: number;
  expectedReturn: number; // Total expected return
  percentageReturn: number; // Percentage return from the plan
  dailyProfit: number; // Calculated daily profit
  totalProfit: number; // Accumulated profit so far
  
  // Status tracking
  status: 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  completedAt?: Date;
  
  // Profit distribution tracking
  lastProfitDistribution?: Date;
  nextProfitDistribution?: Date;
  profitDistributions: {
    amount: number;
    date: Date;
    balanceAfter: number;
  }[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Validation for Investment Plan
 */
export function validateInvestmentPlan(plan: Partial<InvestmentPlan>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!plan.name || plan.name.trim().length < 3) {
    errors.push('Name must be at least 3 characters long');
  }

  if (!plan.description || plan.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!plan.minimumAmount || plan.minimumAmount < 0) {
    errors.push('Minimum amount must be greater than 0');
  }

  if (!plan.maximumAmount || plan.maximumAmount <= (plan.minimumAmount || 0)) {
    errors.push('Maximum amount must be greater than minimum amount');
  }

  if (!plan.durationDays || plan.durationDays < 1) {
    errors.push('Duration must be at least 1 day');
  }

  if (!plan.percentageReturn || plan.percentageReturn <= 0) {
    errors.push('Percentage return must be greater than 0');
  }

  if (!plan.risk || !['low', 'medium', 'high'].includes(plan.risk)) {
    errors.push('Risk must be low, medium, or high');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate daily return from total percentage
 */
export function calculateDailyReturn(totalPercentage: number, durationDays: number): number {
  return totalPercentage / durationDays;
}

/**
 * Create Investment Plan document with defaults
 */
export function createInvestmentPlanDocument(
  data: Omit<InvestmentPlan, '_id' | 'createdAt' | 'updatedAt' | 'dailyReturn'>
): InvestmentPlan {
  const dailyReturn = calculateDailyReturn(data.percentageReturn, data.durationDays);
  
  return {
    ...data,
    dailyReturn,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Calculate investment projections
 */
export function calculateInvestmentProjections(amount: number, plan: InvestmentPlan) {
  const dailyProfit = (amount * plan.dailyReturn) / 100;
  const totalReturn = (amount * plan.percentageReturn) / 100;
  const finalAmount = amount + totalReturn;
  
  return {
    initialAmount: amount,
    dailyProfit,
    totalReturn,
    finalAmount,
    duration: plan.durationDays,
    dailyReturnPercentage: plan.dailyReturn,
    totalReturnPercentage: plan.percentageReturn,
  };
}

/**
 * Create User Investment document
 */
export function createUserInvestmentDocument(
  userId: ObjectId,
  plan: InvestmentPlan,
  amount: number
): Omit<UserInvestment, '_id'> {
  const projections = calculateInvestmentProjections(amount, plan);
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + plan.durationDays);
  
  // Next profit distribution is tomorrow
  const nextDistribution = new Date(startDate);
  nextDistribution.setDate(nextDistribution.getDate() + 1);
  nextDistribution.setHours(0, 0, 0, 0); // Midnight

  return {
    userId,
    investmentPlanId: plan._id!,
    investmentPlanName: plan.name,
    amount,
    expectedReturn: projections.totalReturn,
    percentageReturn: plan.percentageReturn,
    dailyProfit: projections.dailyProfit,
    totalProfit: 0,
    status: 'active',
    startDate,
    endDate,
    nextProfitDistribution: nextDistribution,
    profitDistributions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
