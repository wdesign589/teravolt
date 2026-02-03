import { MongoClient } from 'mongodb';

async function checkUserKYC() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://wdesign589:1122334455Pati@cluster.9mjgrp1.mongodb.net/?appName=Cluster';
  const dbName = process.env.MONGODB_DB_NAME || 'terravolt';
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB\n');
    
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ email: 'wdesign589@gmail.com' });
    
    if (user) {
      console.log('User found:', user.email);
      console.log('KYC Status:', user.kycStatus);
      console.log('\nKYC Documents:');
      console.log(JSON.stringify(user.kycDocuments, null, 2));
    } else {
      console.log('User not found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

checkUserKYC();
