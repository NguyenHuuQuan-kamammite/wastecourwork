const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assuming User model is used to verify user info

// Middleware to verify the token
exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];


  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be stored in your .env file
    req.user = decoded.user; // Attach the user information from the decoded token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if the user is an admin (if needed for specific routes)
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user contains the user's ID from the token
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
