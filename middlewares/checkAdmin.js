const checkAdmin = (req, res, next) => {
    const user = req.user;
  
    if (user && user.role === 1) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
  };
  
  module.exports = { checkAdmin };


// const jwt = require("jsonwebtoken");

// function checkAdmin(req, res, next) {
//     const token = req.headers.authorization;
//     const decoded = jwt.decode(token);

//     if (decoded.role === 1) {
//         next();
//     }

//     res.status(403).json({ message: 'Unauthorized' });
// }

// module.exports = { checkAdmin }