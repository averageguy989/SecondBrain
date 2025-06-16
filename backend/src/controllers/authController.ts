import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { generateAccessToken, generateRefreshToken } from '../utils/authUtils';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    
    // TODO: Add validation
    if (!email || !password || !name) {
      res.status(400).json({ 
        error: 'Email, password, and name are required' 
      });
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      res.status(400).json({ 
        error: 'User with this email already exists' 
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    // Generate JWT token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(201)
        .json({
            message: 'User created successfully',
            user
        });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // TODO: Add validation
    if (!email || !password) {
      res.status(400).json({ 
        error: 'Email and password are required' 
      });
      return;
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json({ 
        error: 'Invalid email or password' 
      });
      return;
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ 
        error: 'Invalid email or password' 
      });
      return;
    }

    // Generate JWT token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(201)
    .json({
      message: 'Login successful',
      user
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Add logout logic (invalidate token, etc.)

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.json({
        message: 'Logged out'
    })
  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.body.token;
    if(!token){
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET || 'default-secret') as { userId: string; email: string };

    if(!decoded){
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    const newAccessToken = generateAccessToken({id: decoded.userId, email: decoded.email, name: null, password: null, role: 'user'});

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    })
    .json({ message: 'Token refreshed' });
  }
  catch (error) {
    if(error instanceof jwt.JsonWebTokenError){
      res.status(401).json({ error: 'Invalid token' });
    }
    else{
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};