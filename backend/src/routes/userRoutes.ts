import { Router } from 'express';
import { deleteUser, getUserProfile, updateUserProfile } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Protected user routes (require authentication)
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.delete('/profile', authenticateToken, deleteUser);

// Test routes
router.get('/test', (req, res) => {
  res.json({ message: 'User routes are working!' });
});

// Protected test route
router.get('/protected-test', authenticateToken, (req, res) => {
  res.json({ 
    message: 'Protected route is working!',
    user: req.user
  });
});

export default router; 