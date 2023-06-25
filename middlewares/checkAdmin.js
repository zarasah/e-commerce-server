const checkAdmin = (req, res, next) => {
    const user = req.user;
  
    if (user && user.role === 1) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
  };
  
  module.exports = { checkAdmin };