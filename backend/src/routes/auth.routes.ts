import { Router, Request, Response } from 'express';
import { signin, signup } from '../controllers/auth.controller';
import { validateSignup } from '../middleware/validation.middleware';

const router = Router();

// Signup route with validation
router.post('/signup', validateSignup, async (req: Request, res: Response) => {
  await signup(req, res);
});

router.post('/signin', async (req: Request, res: Response) => {
  await signin(req, res);
});

export default router; 