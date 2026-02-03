import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { getDatabase } from '@/lib/db/mongodb';
import { UserInvestment } from '@/lib/models/Investment';
import { UserDocument } from '@/lib/models/User';
import { createTransaction } from '@/lib/helpers/transactions';
import { ObjectId } from 'mongodb';

/**
 * Cron Job: Distribute hourly profits to active investments based on timestamps
 * Should run every hour (or more frequently)
 * Calculates profit based on actual time elapsed since last distribution
 */
async function distributeDailyProfits() {
  console.log('💰 Starting hourly profit distribution...\n');
  console.log(`⏰ Time: ${new Date().toISOString()}\n`);

  try {
    const db = await getDatabase();
    const investmentsCollection = db.collection<UserInvestment>('userInvestments');
    const usersCollection = db.collection<UserDocument>('users');

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago

    // Find all active investments
    // Only process investments that have been active for at least 1 hour
    const activeInvestments = await investmentsCollection
      .find({
        status: 'active',
        createdAt: { $lte: oneHourAgo }, // Must be at least 1 hour old
      })
      .toArray();

    console.log(`📊 Found ${activeInvestments.length} investments to process\n`);

    let processedCount = 0;
    let completedCount = 0;
    let totalDistributed = 0;

    for (const investment of activeInvestments) {
      try {
        // Check if investment has ended
        if (now >= investment.endDate) {
          // Get user for balance update
          const user = await usersCollection.findOne({ _id: investment.userId });
          if (!user) {
            console.error(`❌ User not found: ${investment.userId.toString()}`);
            continue;
          }

          // Calculate total return: principal + all profits
          const totalReturn = investment.amount + investment.totalProfit;
          const balanceBefore = user.balance || 0;
          const balanceAfter = balanceBefore + totalReturn;

          const session = db.client.startSession();
          
          try {
            await session.withTransaction(async () => {
              // Complete the investment
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

              // Add principal + profit back to user balance
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

              // Create transaction record
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

            await session.endSession();

            console.log(`✅ Completed investment: ${investment._id?.toString()}`);
            console.log(`   User: ${investment.userId.toString()}`);
            console.log(`   Plan: ${investment.investmentPlanName}`);
            console.log(`   Principal: $${investment.amount.toFixed(2)}`);
            console.log(`   Total Profit: $${investment.totalProfit.toFixed(2)}`);
            console.log(`   Total Returned: $${totalReturn.toFixed(2)}`);
            console.log(`   New Balance: $${balanceAfter.toFixed(2)}\n`);
            
            completedCount++;
          } catch (error) {
            await session.endSession();
            throw error;
          }
          
          continue;
        }

        // Calculate profit based on time elapsed since last distribution
        const lastDistribution = investment.lastProfitDistribution || investment.createdAt;
        const hoursElapsed = (now.getTime() - lastDistribution.getTime()) / (1000 * 60 * 60);
        
        // Only distribute if at least 1 hour has passed
        if (hoursElapsed < 1) {
          console.log(`⏭️  Skipping ${investment._id?.toString()} - Only ${hoursElapsed.toFixed(2)} hours elapsed`);
          continue;
        }

        // Calculate profit proportionally based on hours elapsed
        // dailyProfit is for 24 hours, so hourly rate = dailyProfit / 24
        const hourlyProfitRate = investment.dailyProfit / 24;
        const profitToDistribute = hourlyProfitRate * hoursElapsed;
        const newTotalProfit = investment.totalProfit + profitToDistribute;

        // Get user for transaction record
        const user = await usersCollection.findOne({ _id: investment.userId });
        if (!user) {
          console.error(`❌ User not found: ${investment.userId.toString()}`);
          continue;
        }

        const currentBalance = user.balance || 0;

        // Update investment (profit accumulates but does NOT add to balance)
        const session = db.client.startSession();
        
        try {
          await session.withTransaction(async () => {
            // Update investment - track profit but don't add to balance yet
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
                    balanceAfter: currentBalance, // Balance unchanged during investment
                  },
                },
              },
              { session }
            );

            // Create transaction record for tracking (no balance change)
            await createTransaction(db, {
              userId: investment.userId,
              type: 'investment_return',
              amount: profitToDistribute,
              status: 'completed',
              description: `Profit accrued from ${investment.investmentPlanName} (${hoursElapsed.toFixed(2)} hours). Profit will be added to balance when investment completes.`,
              investmentId: investment._id,
              investmentPlanName: investment.investmentPlanName,
              balanceBefore: currentBalance,
              balanceAfter: currentBalance, // Balance unchanged
              session,
            });
          });

          await session.endSession();

          console.log(`✅ Accrued profit: ${investment._id?.toString()}`);
          console.log(`   User: ${investment.userId.toString()}`);
          console.log(`   Plan: ${investment.investmentPlanName}`);
          console.log(`   Hours Elapsed: ${hoursElapsed.toFixed(2)} hours`);
          console.log(`   Hourly Rate: $${hourlyProfitRate.toFixed(2)}/hour`);
          console.log(`   Profit Distributed: $${profitToDistribute.toFixed(2)}`);
          console.log(`   Total Profit: $${newTotalProfit.toFixed(2)}/$${investment.expectedReturn.toFixed(2)}`);
          console.log(`   User Balance: $${currentBalance.toFixed(2)} (unchanged)\n`);

          processedCount++;
          totalDistributed += profitToDistribute;
        } catch (error) {
          await session.endSession();
          throw error;
        }
      } catch (error) {
        console.error(`❌ Error processing investment ${investment._id?.toString()}:`, error);
      }
    }

    console.log('\n📈 Distribution Summary:');
    console.log(`   ✅ Processed: ${processedCount} investments`);
    console.log(`   🏁 Completed: ${completedCount} investments`);
    console.log(`   💵 Total Distributed: $${totalDistributed.toFixed(2)}`);
    console.log(`   ⏰ Finished at: ${new Date().toISOString()}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error during profit distribution:', error);
    process.exit(1);
  }
}

distributeDailyProfits();
