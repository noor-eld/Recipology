const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is running',
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });

app.use((req, res, next) => {
    console.log('Incoming request:', {
      method: req.method,
      path: req.path,
      headers: {
        authorization: req.headers.authorization ? 'Bearer [hidden]' : 'none',
        'content-type': req.headers['content-type']
      }
    });
    next();
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/uploads', express.static('uploads'));

// Add this AFTER your routes but BEFORE the 404 handler
app.use((req, res, next) => {
    console.log('No route matched for:', req.method, req.originalUrl);
    next();
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
    console.log('404 handler called for:', req.method, req.originalUrl);
    res.status(404).json({ error: 'Route not found' });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('MongoDB URI:', process.env.MONGO_URI?.replace(/:\/\/[^@]+@/, '://*****@')); // Hide credentials if any
});