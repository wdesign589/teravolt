/**
 * Copy Trading Daily Profit Distribution Script
 * Runs daily to distribute profits to users copying traders
 * 
 * This script:
 * 1. Finds all active copy trading relationships
 * 2. Calculates profit based on: allocatedAmount * (percentageGainPerDay / 100)
 * 3. Adds profit to user balance
 * 4. Creates transaction record
 * 5. Updates totalEarned in userCopyTrading document
 */

import { ObjectId } from 'mongodb';
import clientPromise from '../lib/db/mongodb';
import { getAllActiveCopyTradings, addProfitToCopyTrading } from '../lib/models/UserCopyTrading';
import { getCopyTraderById } from '../lib/models/CopyTrader';
import { createTransaction } from '../lib/helpers/transactions';

interface User {
  _id: ObjectId;
  balance: number;
}

async function distributeCopyTradingProfits() {
  console.log('🚀 Starting Copy Trading Profit Distribution...');
  console.log(`📅 ${new Date().toISOString()}\n`);

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection<User>('users');

    // Get all active copy trading relationships
    const activeCopyTradings = await getAllActiveCopyTradings();
    
    if (activeCopyTradings.length === 0) {
      console.log('ℹ️  No active copy trading relationships found.');
      return;
    }

    console.log(`📊 Found ${activeCopyTradings.length} active copy trading relationships\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const copyTrading of activeCopyTradings) {
      try {
        // Get trader details to fetch percentageGainPerDay
        const trader = await getCopyTraderById(copyTrading.traderId.toString());
        
        if (!trader) {
          console.log(`⚠️  Trader ${copyTrading.traderId} not found for user ${copyTrading.userId}`);
          errorCount++;
          continue;
        }

        if (!trader.isActive) {
          console.log(`⚠️  Trader ${trader.name} is inactive, skipping...`);
          continue;
        }

        // Calculate daily profit
        const dailyProfitPercentage = trader.percentageGainPerDay;
        const allocatedAmount = copyTrading.allocatedAmount;
        const profitAmount = (allocatedAmount * dailyProfitPercentage) / 100;

        console.log(`💰 Processing: User ${copyTrading.userId} copying ${trader.name}`);
        console.log(`   Allocated: $${allocatedAmount.toFixed(2)}`);
        console.log(`   Daily Rate: ${dailyProfitPercentage}%`);
        console.log(`   Profit: $${profitAmount.toFixed(2)}`);

        // Get user's current balance
        const user = await usersCollection.findOne({ _id: copyTrading.userId });
        
        if (!user) {
          console.log(`   ❌ User not found`);
          errorCount++;
          continue;
        }

        const balanceBefore = user.balance || 0;
        
        // Check if user still has sufficient balance for allocated amount
        // If the user's balance is less than allocated amount, they can't cover it
        // So we stop the copy trading relationship
        if (balanceBefore < allocatedAmount) {
          console.log(`   ⚠️  Insufficient balance to maintain copy trading`);
          console.log(`   💼 Current Balance: $${balanceBefore.toFixed(2)}`);
          console.log(`   📊 Required Allocation: $${allocatedAmount.toFixed(2)}`);
          console.log(`   🛑 Stopping copy trading relationship...`);
          
          // Stop copy trading (set to inactive)
          const copyTradingCollection = await db.collection('userCopyTrading');
          await copyTradingCollection.updateOne(
            { _id: copyTrading._id },
            { 
              $set: {
                status: 'inactive',
                updatedAt: new Date(),
              }
            }
          );
          
          // Note: We don't update trader followers count because it's a display string ("2.4k")
          // not a numeric counter that can be incremented/decremented
          
          // Create notification transaction
          await createTransaction(db, {
            userId: copyTrading.userId,
            type: 'withdrawal',
            amount: 0,
            status: 'completed',
            description: `Copy Trading Auto-Stopped: Insufficient balance to maintain $${allocatedAmount.toFixed(2)} allocation for ${trader.name}. Your copy trading has been automatically terminated.`,
            balanceBefore,
            balanceAfter: balanceBefore,
          });
          
          console.log(`   ✅ Copy trading stopped due to insufficient balance\n`);
          successCount++;
          continue; // Skip profit distribution for this user
        }

        const balanceAfter = balanceBefore + profitAmount;

        // Update user balance
        const updateResult = await usersCollection.updateOne(
          { _id: copyTrading.userId },
          { 
            $inc: { balance: profitAmount },
            $set: { updatedAt: new Date() }
          }
        );

        if (updateResult.modifiedCount === 0) {
          console.log(`   ❌ Failed to update user balance`);
          errorCount++;
          continue;
        }

        // Create transaction record
        await createTransaction(db, {
          userId: copyTrading.userId,
          type: 'copy_trading_return',
          amount: profitAmount,
          status: 'completed',
          description: `Copy Trading Daily Return from ${trader.name}`,
          balanceBefore,
          balanceAfter,
        });

        // Update copy trading document
        await addProfitToCopyTrading(
          copyTrading._id!.toString(),
          profitAmount
        );

        console.log(`   ✅ Success! New balance: $${balanceAfter.toFixed(2)}\n`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Error processing copy trading for user ${copyTrading.userId}:`, error);
        errorCount++;
      }
    }

    console.log('\n📈 Distribution Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📊 Total Processed: ${activeCopyTradings.length}`);
    console.log('\n✨ Copy Trading Profit Distribution Complete!');

  } catch (error) {
    console.error('❌ Fatal error in copy trading profit distribution:', error);
    throw error;
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  distributeCopyTradingProfits()
    .then(() => {
      console.log('\n🎉 Script finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Script failed:', error);
      process.exit(1);
    });
}

export default distributeCopyTradingProfits;
