import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(411).json({
        message: 'Email and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(403).json({
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null
      }
    });

    // Return user data (excluding password)
    res.status(200).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}; 


export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(411).json({
                message: 'Email and password are required'
            });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        if (!user) {
            return res.status(403).json({
                message: 'User with this email does not exist'
            });
        }
        
        // Check password   
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(403).json({
                message: 'Invalid password'
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret' , { expiresIn: '24h' });

        // Return user data and token
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt
            },
            token
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}; 