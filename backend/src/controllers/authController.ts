import { Request, Response } from 'express';
import { mockUserStore } from '../utils/mockUserStore.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    const userExists = await mockUserStore.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await mockUserStore.create({
        name,
        email,
        password,
        role: role || 'rider',
        status: 'active',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
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
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

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
