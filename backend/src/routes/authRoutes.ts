import { Router } from 'express';
import { signin, signup, signout, refreshToken } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';
const router = Router();

// Authentication routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', authenticateToken, signout);
router.post('/refresh', refreshToken);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

export default router; 