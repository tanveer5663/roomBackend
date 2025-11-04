// middleware/roleMiddleware.js
// usage: authorize('student') or authorize('owner') or authorize('student','owner')
// middleware/roleMiddleware.js

// Function to authorize user by role
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};
