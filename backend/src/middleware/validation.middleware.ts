import { Request, Response, NextFunction } from 'express';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateSignup = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  // 1. Check if both email and password are sent
  if (!email || !password) {
    res.status(411).json({
      message: 'Email and password are required'
    });
    return;
  }

  // 2. Validate email format
  if (!emailRegex.test(email)) {
    res.status(411).json({
      message: 'Invalid email format'
    });
    return;
  }

  // 3. Validate password length (8-20 characters)
  if (password.length < 8 || password.length > 20) {
    res.status(411).json({
      message: 'Password must be between 8 and 20 characters'
    });
    return;
  }

  // 4. Validate password contains both lowercase and uppercase letters
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  
  if (!hasLowerCase || !hasUpperCase) {
    res.status(411).json({
      message: 'Password must contain both lowercase and uppercase letters'
    });
    return;
  }

  next();
}; 