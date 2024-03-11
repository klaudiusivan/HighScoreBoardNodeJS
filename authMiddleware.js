// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get token from request headers
  const token = req.headers.authorization.split(' ')[1];

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.playerId = decoded.playerId; // Add player ID to request object for future use
    next(); // Proceed to next middleware or route handler
  });
}

module.exports = { verifyToken };

