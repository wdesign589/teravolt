import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://wdesign589:1122334455Pati@cluster.9mjgrp1.mongodb.net/?appName=Cluster';
  const dbName = process.env.MONGODB_DB_NAME || 'terravolt';
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    
    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ 
      email: 'admin@terravolt.com' 
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('Brainbox77', 10);
    
    // Create admin user
    const adminUser = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@terravolt.com',
      phone: '+1234567890',
      dateOfBirth: '1990-01-01',
      address: 'Admin Address',
      city: 'Admin City',
      postalCode: '00000',
      country: 'US',
      password: hashedPassword,
      role: 'admin',
      kycStatus: 'approved',
      emailVerified: true,
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await usersCollection.insertOne(adminUser);
    console.log('Admin user created successfully!');
    console.log('Email: admin@terravolt.com');
    console.log('Password: Brainbox77');
    console.log('User ID:', result.insertedId);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
  }
}

createAdmin();
