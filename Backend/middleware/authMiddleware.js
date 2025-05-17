const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized to access this route (token missing)'
    });
  }

  try 
  {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID and attach to req
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    res.status(401).json({
      message: 'Not authorized, invalid token'
    });
  }
};

module.exports = { protect };
