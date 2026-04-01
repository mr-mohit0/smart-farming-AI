const { MongoClient } = require('mongodb');
const { seedAdmin } = require('../utils/seedAdmin');

let db = null;

async function connectDB() {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
db = client.db("smartfarming");
    console.log('✅ Connected to MongoDB');
    
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('login_attempts').createIndex({ identifier: 1 });
    
    await seedAdmin(db);
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

module.exports = { connectDB, getDB };
