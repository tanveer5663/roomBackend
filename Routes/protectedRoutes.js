// routes/protectedRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Student-only route
router.get('/student/profile', protect, authorize('student'), (req, res) => {
  res.json({ message: 'Student profile', user: req.user });
});

// Owner-only route
router.get('/owner/profile', protect, authorize('owner'), (req, res) => {
  res.json({ message: 'Owner profile', user: req.user });
});

// Route accessible to both
router.get('/me', protect, authorize('student','owner'), (req, res) => {
  res.json({ message: 'Me', user: req.user });
});

export default router;
