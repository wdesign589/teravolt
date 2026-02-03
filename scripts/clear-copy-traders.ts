import clientPromise from '../lib/db/mongodb';

async function clearCopyTraders() {
  try {
    console.log('🗑️  Starting to clear copy traders...\n');
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || 'crypto-saas');
    const collection = db.collection('copyTraders');
    
    // Count traders before deletion
    const countBefore = await collection.countDocuments();
    console.log(`📊 Found ${countBefore} traders in database`);
    
    if (countBefore === 0) {
      console.log('✨ Database is already empty!');
      process.exit(0);
    }
    
    // Delete all copy traders
    console.log('\n🗑️  Deleting all copy traders...');
    const result = await collection.deleteMany({});
    
    console.log(`✅ Successfully deleted ${result.deletedCount} traders`);
    
    // Verify deletion
    const countAfter = await collection.countDocuments();
    console.log(`📊 Traders remaining: ${countAfter}`);
    
    if (countAfter === 0) {
      console.log('\n✨ All copy traders cleared successfully!');
      console.log('💡 You can now run: npm run seed-copy-traders');
    } else {
      console.log('\n⚠️  Warning: Some traders may still remain');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing copy traders:', error);
    process.exit(1);
  }
}

clearCopyTraders();
