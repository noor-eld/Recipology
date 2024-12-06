const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options help handle potential connection issues
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s
      family: 4 // Use IPv4, skip trying IPv6
    });

    console.log('MongoDB Connected:');
    console.log('  Host:', conn.connection.host);
    console.log('  Port:', conn.connection.port);
    console.log('  Database:', conn.connection.name);
    
    // Add event listeners for connection issues
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Log more details about the error
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to any MongoDB servers');
      console.error('Please check if MongoDB is running and accessible');
    }
    process.exit(1);
  }
};

module.exports = connectDB;