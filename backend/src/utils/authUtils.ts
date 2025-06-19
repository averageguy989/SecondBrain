import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateAccessToken = (user: { id: string, email: string}): string => {
    if (!process.env.ACCESS_SECRET) {
        throw new Error('ACCESS_SECRET is not defined');
    }
    return jwt.sign({ id: user.id, email: user.email}, process.env.ACCESS_SECRET, { expiresIn: '15m' });
}

export const generateRefreshToken = (user: { id: string, email: string}): string => {
    if (!process.env.REFRESH_SECRET) {
        throw new Error('REFRESH_SECRET is not defined');
    }
    return jwt.sign({ id: user.id, email: user.email}, process.env.REFRESH_SECRET, { expiresIn: '7d' });
}


