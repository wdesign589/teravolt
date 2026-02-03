import { MongoClient } from 'mongodb';

async function checkKycStatus() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://wdesign589:1122334455Pati@cluster.9mjgrp1.mongodb.net/?appName=Cluster';
  const dbName = process.env.MONGODB_DB_NAME || 'terravolt';
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB\n');
    
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    
    // Get all users with their KYC status
    const users = await usersCollection.find({}, {
      projection: {
        email: 1,
        firstName: 1,
        lastName: 1,
        kycStatus: 1,
        kycDocuments: 1
      }
    }).toArray();
    
    console.log('Current KYC Status for all users:\n');
    console.log('='.repeat(80));
    
    for (const user of users) {
      console.log(`\nEmail: ${user.email}`);
      console.log(`Name: ${user.firstName} ${user.lastName}`);
      console.log(`KYC Status: ${user.kycStatus}`);
      console.log(`Has Documents: ${user.kycDocuments ? 'Yes' : 'No'}`);
      console.log('-'.repeat(80));
    }
    
    // Count by status
    const statusCounts = await usersCollection.aggregate([
      {
        $group: {
          _id: '$kycStatus',
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    
    console.log('\n\nStatus Summary:');
    console.log('='.repeat(80));
    for (const status of statusCounts) {
      console.log(`${status._id}: ${status.count} user(s)`);
    }
    
  } catch (error) {
    console.error('Error checking KYC status:', error);
  } finally {
    await client.close();
  }
}

checkKycStatus();
