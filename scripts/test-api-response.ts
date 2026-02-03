import { MongoClient, ObjectId } from 'mongodb';

async function testAPIResponse() {
  const uri = process.env.MONGODB_URI || 'your_mongodb_connection_string';
  const dbName = process.env.MONGODB_DB_NAME || 'terravolt';
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    
    // Find the web design user
    const user = await usersCollection.findOne({ email: 'wdesign589@gmail.com' });
    
    if (user) {
      console.log('User ID:', user._id.toString());
      console.log('\nTest the API with this URL:');
      console.log(`http://localhost:3000/api/admin/users/${user._id.toString()}`);
      console.log('\nOr click three dots in admin panel next to "web design" user');
      console.log('Then click "Review KYC"');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testAPIResponse();
