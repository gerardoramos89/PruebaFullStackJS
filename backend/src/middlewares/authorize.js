const authMiddleware = require('./authMiddleware');

const authorize = (roles) => {
  return (req, res, next) => {
    authMiddleware(req, res, () => {
      if (!roles.includes(req.userRole)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    });
  };
};

module.exports = authorize;
