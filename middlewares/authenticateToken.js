const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET);

      const userId = decoded.id;
      const userEmail = decoded.email;
      const userRole = decoded.role;

      req.user = {
        id: userId,
        email: userEmail,
        role: userRole
      };

      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Token not found' });
  }
};

module.exports = { authenticateToken };

