import clientPromise from '../lib/db/mongodb';

async function checkTraders() {
  try {
    console.log('🔍 Checking database for copy traders...\n');
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || 'crypto-saas');
    const collection = db.collection('copyTraders');
    
    const traders = await collection.find({}).toArray();
    
    console.log('📊 Total traders in database:', traders.length);
    console.log('\n📋 Traders:');
    
    if (traders.length === 0) {
      console.log('❌ No traders found in database!');
    } else {
      traders.forEach((trader, index) => {
        console.log(`\n${index + 1}. ${trader.name}`);
        console.log(`   ID: ${trader._id}`);
        console.log(`   Avatar: ${trader.avatar}`);
        console.log(`   ROI: ${trader.roi}%`);
        console.log(`   Badge: ${trader.badge}`);
        console.log(`   Active: ${trader.isActive}`);
        console.log(`   % Gain/Day: ${trader.percentageGainPerDay}%`);
      });
    }
    
    console.log('\n✅ Check complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkTraders();
