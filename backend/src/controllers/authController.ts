import { Request, Response } from 'express';
import { z } from 'zod';
import { mockUserStore } from '../utils/mockUserStore.js';
import generateToken from '../utils/generateToken.js';

// Strict registration Zod schema
const registerSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
});

// Strict login Zod schema
const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
    // Validate request payload using Zod (BUG-002, BUG-042)
    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(err => err.message).join(', ');
        res.status(400);
        throw new Error(`Validation Error: ${errorMessages}`);
    }

    const { name, email, password, phone } = validationResult.data;

    const userExists = await mockUserStore.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email address');
    }

    // STRICT ROLE STRIPPING (BUG-001): Force role to 'rider'. Public self-registration cannot create drivers or admins.
    const user = await mockUserStore.create({
        name,
        email,
        password,
        phone,
        role: 'rider', // Always force 'rider'
        status: 'active',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            phone: user.phone,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
    // Validate login payload using Zod
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(err => err.message).join(', ');
        res.status(400);
        throw new Error(`Validation Error: ${errorMessages}`);
    }

    const { email, password } = validationResult.data;

    const user = await mockUserStore.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordMatch = await mockUserStore.matchPassword(password, user.password);

    if (!isPasswordMatch) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Check if user is blocked or suspended
    if (user.status === 'blocked' || user.status === 'suspended') {
        return res.status(403).json({
            message: `Account is ${user.status}. Please contact support.`,
            status: user.status
        });
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        rating: user.rating,
        isOnline: user.isOnline,
        vehicleDetails: user.vehicleDetails,
        token: generateToken(user._id),
    });
};
