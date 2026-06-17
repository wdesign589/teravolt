import { getDatabase } from '@/lib/db/mongodb';
import { createTransaction } from '@/lib/helpers/transactions';
import { UserInvestment } from '@/lib/models/Investment';
import { UserDocument } from '@/lib/models/User';

export interface InvestmentProfitSummary {
  processedCount: number;
  completedCount: number;
  totalDistributed: number;
  skippedCount: number;
}

/**
 * Accrues investment profits based on elapsed time and completes matured investments.
 * Designed to run hourly; also works on a daily schedule because it uses time elapsed
 * since the last distribution.
 */
export async function distributeInvestmentProfits(): Promise<InvestmentProfitSummary> {
  const db = await getDatabase();
  const investmentsCollection = db.collection<UserInvestment>('userInvestments');
  const usersCollection = db.collection<UserDocument>('users');

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const activeInvestments = await investmentsCollection
    .find({
      status: 'active',
      createdAt: { $lte: oneHourAgo },
    })
    .toArray();

  let processedCount = 0;
  let completedCount = 0;
  let skippedCount = 0;
  let totalDistributed = 0;

  for (const investment of activeInvestments) {
    try {
      if (now >= investment.endDate) {
        const user = await usersCollection.findOne({ _id: investment.userId });
        if (!user) {
          continue;
        }

        const totalReturn = investment.amount + investment.totalProfit;
        const balanceBefore = user.balance || 0;
        const balanceAfter = balanceBefore + totalReturn;

        const session = db.client.startSession();

        try {
          await session.withTransaction(async () => {
            await investmentsCollection.updateOne(
              { _id: investment._id },
              {
                $set: {
                  status: 'completed',
                  completedAt: now,
                  updatedAt: now,
                },
              },
              { session }
            );

            await usersCollection.updateOne(
              { _id: investment.userId },
              {
                $inc: {
                  balance: totalReturn,
                  totalProfit: investment.totalProfit,
                },
                $set: { updatedAt: now },
              },
              { session }
            );

            await createTransaction(db, {
              userId: investment.userId,
              type: 'investment_completion',
              amount: totalReturn,
              status: 'completed',
              description: `Investment completed: ${investment.investmentPlanName}. Principal ($${investment.amount.toFixed(2)}) + Profit ($${investment.totalProfit.toFixed(2)}) returned to balance.`,
              investmentId: investment._id,
              investmentPlanName: investment.investmentPlanName,
              balanceBefore,
              balanceAfter,
              session,
            });
          });

          completedCount++;
        } finally {
          await session.endSession();
        }

        continue;
      }

      const lastDistribution = investment.lastProfitDistribution || investment.createdAt;
      const hoursElapsed =
        (now.getTime() - lastDistribution.getTime()) / (1000 * 60 * 60);

      if (hoursElapsed < 1) {
        skippedCount++;
        continue;
      }

      const hourlyProfitRate = investment.dailyProfit / 24;
      const profitToDistribute = hourlyProfitRate * hoursElapsed;
      const newTotalProfit = investment.totalProfit + profitToDistribute;

      const user = await usersCollection.findOne({ _id: investment.userId });
      if (!user) {
        continue;
      }

      const currentBalance = user.balance || 0;
      const session = db.client.startSession();

      try {
        await session.withTransaction(async () => {
          await investmentsCollection.updateOne(
            { _id: investment._id },
            {
              $set: {
                totalProfit: newTotalProfit,
                lastProfitDistribution: now,
                updatedAt: now,
              },
              $push: {
                profitDistributions: {
                  amount: profitToDistribute,
                  date: now,
                  balanceAfter: currentBalance,
                },
              },
            },
            { session }
          );

          await createTransaction(db, {
            userId: investment.userId,
            type: 'investment_return',
            amount: profitToDistribute,
            status: 'completed',
            description: `Profit accrued from ${investment.investmentPlanName} (${hoursElapsed.toFixed(2)} hours). Profit will be added to balance when investment completes.`,
            investmentId: investment._id,
            investmentPlanName: investment.investmentPlanName,
            balanceBefore: currentBalance,
            balanceAfter: currentBalance,
            session,
          });
        });

        processedCount++;
        totalDistributed += profitToDistribute;
      } finally {
        await session.endSession();
      }
    } catch (error) {
      console.error(
        `Error processing investment ${investment._id?.toString()}:`,
        error
      );
    }
  }

  return {
    processedCount,
    completedCount,
    skippedCount,
    totalDistributed,
  };
}
