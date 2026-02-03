/**
 * Migration Script: Fix Copy Trading Transaction Types
 * 
 * This script updates existing copy trading transactions that were incorrectly
 * marked as type 'deposit' to the correct type 'copy_trading_return'.
 * 
 * Run this once to clean up existing data:
 * node scripts/fix-copy-trading-transactions.js
 */

const { MongoClient } = require('mongodb');

async function fixCopyTradingTransactions() {
  const uri = process.env.MONGODB_URI || 'your-mongodb-uri-here';
  const dbName = process.env.MONGODB_DB_NAME || 'your-db-name-here';
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);
    const transactionsCollection = db.collection('transactions');
    
    // Find all deposit transactions that are actually copy trading returns
    // (they won't have walletSymbol and description contains "Copy Trading")
    const result = await transactionsCollection.updateMany(
      {
        type: 'deposit',
        walletSymbol: { $exists: false },
        description: { $regex: /Copy Trading/i }
      },
      {
        $set: {
          type: 'copy_trading_return',
          updatedAt: new Date()
        }
      }
    );
    
    console.log('✅ Migration completed!');
    console.log(`   Matched: ${result.matchedCount} documents`);
    console.log(`   Modified: ${result.modifiedCount} documents`);
    
    if (result.modifiedCount > 0) {
      console.log('\n📊 Copy trading transactions have been reclassified.');
      console.log('   They will no longer appear in the admin deposits page.');
    } else {
      console.log('\n✨ No transactions needed updating. Database is clean!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

fixCopyTradingTransactions();
