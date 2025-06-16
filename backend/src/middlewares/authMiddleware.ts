import { Request, Response, NextFunction } from 'express';
import { generateAccessToken } from '../utils/authUtils';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Extend the Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as { userId: string; email: string };
    req.user = decoded;
    next();
  }
  catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid access token' });
    }
    else{
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};