import { MongoClient } from 'mongodb';

async function fixKycStatus() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://wdesign589:1122334455Pati@cluster.9mjgrp1.mongodb.net/?appName=Cluster';
  const dbName = process.env.MONGODB_DB_NAME || 'terravolt';
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    
    // Find all users with 'pending' status but no kycDocuments
    const usersToUpdate = await usersCollection.find({
      kycStatus: 'pending',
      kycDocuments: { $exists: false }
    }).toArray();
    
    console.log(`Found ${usersToUpdate.length} users with pending KYC but no documents submitted`);
    
    if (usersToUpdate.length === 0) {
      console.log('No users to update!');
      return;
    }
    
    // Update these users to 'not_submitted'
    const result = await usersCollection.updateMany(
      {
        kycStatus: 'pending',
        kycDocuments: { $exists: false }
      },
      {
        $set: { kycStatus: 'not_submitted' }
      }
    );
    
    console.log(`✅ Successfully updated ${result.modifiedCount} users`);
    console.log(`Changed kycStatus from 'pending' to 'not_submitted' for users who haven't submitted documents`);
    
    // Show updated users
    console.log('\nUpdated users:');
    for (const user of usersToUpdate) {
      console.log(`- ${user.email} (${user.firstName} ${user.lastName})`);
    }
    
  } catch (error) {
    console.error('Error fixing KYC status:', error);
  } finally {
    await client.close();
  }
}

fixKycStatus();
