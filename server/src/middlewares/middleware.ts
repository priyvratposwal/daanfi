
import type{ Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../types';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../index';

interface TokenPayload {
    userId: string;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("inside requireAuth");
    const authHeaders = req.headers.authorization;
    console.log("authHeaders", authHeaders);
    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authentication token missing." });
    }
    const token = authHeaders.split(' ')[1];
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ message: "Authentication token missing." });
    }
    try {
    const decodedPayload = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as TokenPayload;
    console.log("decodedPayload", decodedPayload);
        if (!decodedPayload.userId) {
            return res.status(401).json({ message: "Invalid token." });
        }
        console.log("decodedPayload.userId", decodedPayload.userId);
        req.userId = decodedPayload.userId;
        console.log("req.userId", req.userId);
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Invalid token." });
    }
};