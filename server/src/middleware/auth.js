const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      console.log('No token found in request');
      return res.status(401).json({ error: 'Not authorized to access this route' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded);

      // Get user from token
      const user = await User.findById(decoded.id);
      if (!user) {
        console.log('No user found with decoded ID');
        return res.status(401).json({ error: 'User not found' });
      }

      // Attach user to request object
      req.user = user;
      console.log('User attached to request:', { id: user._id, username: user.username });
      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ error: 'Not authorized to access this route' });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ error: 'Server error in auth middleware' });
  }
};