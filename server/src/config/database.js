const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });

    console.log('\nMongoDB Connection Details:');
    console.log('---------------------------');
    console.log('Status: Connected');
    console.log('Host:', conn.connection.host);
    console.log('Port:', conn.connection.port);
    console.log('Database:', conn.connection.name);
    console.log('---------------------------\n');
    
    // Monitor database events
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected - attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });

    // Monitor collection operations
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

    // Verify database access
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

  } catch (error) {
    console.error('\nMongoDB Connection Error:');
    console.error('-------------------------');
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('\nPossible causes:');
      console.error('1. MongoDB service is not running');
      console.error('2. Wrong connection URI');
      console.error('3. Network connectivity issues');
      console.error('\nTroubleshooting steps:');
      console.error('1. Verify MongoDB is running: mongosh');
      console.error('2. Check MONGO_URI in .env file');
      console.error('3. Ensure MongoDB is listening on:', process.env.MONGO_URI);
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;