import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { createTransaction } from '@/lib/helpers/transactions';
import { getCopyTraderById } from '@/lib/models/CopyTrader';
import {
  addProfitToCopyTrading,
  getAllActiveCopyTradings,
} from '@/lib/models/UserCopyTrading';

export interface CopyTradingProfitSummary {
  successCount: number;
  errorCount: number;
  totalProcessed: number;
}

interface User {
  _id: ObjectId;
  balance: number;
}

/**
 * Distributes daily copy-trading profits to active copy relationships.
 */
export async function distributeCopyTradingProfits(): Promise<CopyTradingProfitSummary> {
  const db = await getDatabase();
  const usersCollection = db.collection<User>('users');
  const activeCopyTradings = await getAllActiveCopyTradings();

  let successCount = 0;
  let errorCount = 0;

  if (activeCopyTradings.length === 0) {
    return {
      successCount: 0,
      errorCount: 0,
      totalProcessed: 0,
    };
  }

  for (const copyTrading of activeCopyTradings) {
    try {
      const trader = await getCopyTraderById(copyTrading.traderId.toString());

      if (!trader) {
        errorCount++;
        continue;
      }

      if (!trader.isActive) {
        continue;
      }

      const dailyProfitPercentage = trader.percentageGainPerDay;
      const allocatedAmount = copyTrading.allocatedAmount;
      const profitAmount = (allocatedAmount * dailyProfitPercentage) / 100;

      const user = await usersCollection.findOne({ _id: copyTrading.userId });

      if (!user) {
        errorCount++;
        continue;
      }

      const balanceBefore = user.balance || 0;

      if (balanceBefore < allocatedAmount) {
        const copyTradingCollection = db.collection('userCopyTrading');
        await copyTradingCollection.updateOne(
          { _id: copyTrading._id },
          {
            $set: {
              status: 'inactive',
              updatedAt: new Date(),
            },
          }
        );

        await createTransaction(db, {
          userId: copyTrading.userId,
          type: 'withdrawal',
          amount: 0,
          status: 'completed',
          description: `Copy Trading Auto-Stopped: Insufficient balance to maintain $${allocatedAmount.toFixed(2)} allocation for ${trader.name}. Your copy trading has been automatically terminated.`,
          balanceBefore,
          balanceAfter: balanceBefore,
        });

        successCount++;
        continue;
      }

      const balanceAfter = balanceBefore + profitAmount;

      const updateResult = await usersCollection.updateOne(
        { _id: copyTrading.userId },
        {
          $inc: { balance: profitAmount },
          $set: { updatedAt: new Date() },
        }
      );

      if (updateResult.modifiedCount === 0) {
        errorCount++;
        continue;
      }

      await createTransaction(db, {
        userId: copyTrading.userId,
        type: 'copy_trading_return',
        amount: profitAmount,
        status: 'completed',
        description: `Copy Trading Daily Return from ${trader.name}`,
        balanceBefore,
        balanceAfter,
      });

      await addProfitToCopyTrading(copyTrading._id!.toString(), profitAmount);
      successCount++;
    } catch (error) {
      console.error(
        `Error processing copy trading for user ${copyTrading.userId}:`,
        error
      );
      errorCount++;
    }
  }

  return {
    successCount,
    errorCount,
    totalProcessed: activeCopyTradings.length,
  };
}
