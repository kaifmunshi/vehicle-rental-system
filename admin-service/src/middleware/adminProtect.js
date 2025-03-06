// adminProtect.js
const jwt = require('jsonwebtoken');

const adminProtect = (req, res, next) => {
  let token;

  // 1. Extract the token from the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; 
    // e.g., "Bearer eyJhbGciOi..."
  }

  // 2. Check if token is missing
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded payload to req.admin
    req.admin = decoded;
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    // 4. If verification fails, return a 401 error
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { adminProtect };
