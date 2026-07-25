import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { mockUserStore } from '../utils/mockUserStore.js';

interface DecodedToken {
    id: string;
}

export const protect = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }

    try {
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'rider_app_super_secure_jwt_secret_key_prod_2026';

        const decoded = jwt.verify(
            token,
            secret
        ) as DecodedToken;

        // Use mock user store instead of MongoDB
        const user = await mockUserStore.findById(decoded.id);

        if (!user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }

        // Remove password from user object
        const { password, ...userWithoutPassword } = user;
        req.user = userWithoutPassword;

        next();
    } catch (error) {
        console.error('JWT Auth Error:', (error as Error).message);
        res.status(401);
        throw new Error('Not authorized, token validation failed');
    }
};

export const authorize = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`User role '${req.user?.role}' is not authorized to access this route`);
        }
        next();
    };
};
