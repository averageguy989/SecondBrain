import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../types/user';

dotenv.config();


export const generateAccessToken = (user: User): string => {
    if (!process.env.ACCESS_SECRET) {
        throw new Error('ACCESS_SECRET is not defined');
    }
    return jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
}

export const generateRefreshToken = (user: User): string => {
    if (!process.env.REFRESH_SECRET) {
        throw new Error('REFRESH_SECRET is not defined');
    }
    return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
}


