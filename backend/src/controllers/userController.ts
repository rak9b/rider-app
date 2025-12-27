import { Request, Response } from 'express';
import User from '../models/User.js';
import Ride from '../models/Ride.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: any, res: Response) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            phone: user.phone,
            isOnline: user.isOnline,
            vehicleDetails: user.vehicleDetails,
            emergencyContacts: user.emergencyContacts,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: any, res: Response) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;

        if (user.role === 'driver') {
            user.isOnline = req.body.isOnline !== undefined ? req.body.isOnline : user.isOnline;
            user.vehicleDetails = req.body.vehicleDetails || user.vehicleDetails;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status,
            token: req.headers.authorization?.split(' ')[1] // return existing token
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get driver stats
// @route   GET /api/users/driver/stats
// @access  Private (Driver)
export const getDriverStats = async (req: any, res: Response) => {
    const rides = await Ride.find({ driver: req.user._id, status: 'COMPLETED' });

    const totalEarnings = rides.reduce((acc, ride) => acc + (ride.fare || 0), 0);
    const totalRides = rides.length;

    // Mock weekly breakdown
    const weeklyStats = [
        { name: 'Mon', value: Math.floor(Math.random() * 100) },
        { name: 'Tue', value: Math.floor(Math.random() * 100) },
        { name: 'Wed', value: Math.floor(Math.random() * 100) },
        { name: 'Thu', value: Math.floor(Math.random() * 100) },
        { name: 'Fri', value: Math.floor(Math.random() * 100) },
        { name: 'Sat', value: Math.floor(Math.random() * 100) },
        { name: 'Sun', value: Math.floor(Math.random() * 100) },
    ];

    res.json({
        totalEarnings,
        totalRides,
        weeklyStats
    });
};

// @desc    Get Admin analytics
// @route   GET /api/users/admin/analytics
// @access  Private (Admin)
export const getAdminAnalytics = async (req: Request, res: Response) => {
    const totalUsers = await User.countDocuments();
    const totalDrivers = await User.countDocuments({ role: 'driver' });
    const totalRiders = await User.countDocuments({ role: 'rider' });
    const totalRides = await Ride.countDocuments();
    const completedRides = await Ride.countDocuments({ status: 'COMPLETED' });

    const rides = await Ride.find({ status: 'COMPLETED' });
    const totalRevenue = rides.reduce((acc, ride) => acc + (ride.fare || 0), 0);

    res.json({
        stats: {
            totalUsers,
            totalDrivers,
            totalRiders,
            totalRides,
            completedRides,
            totalRevenue
        },
        // Mock chart data
        revenueStats: [
            { name: 'Week 1', value: totalRevenue * 0.2 },
            { name: 'Week 2', value: totalRevenue * 0.3 },
            { name: 'Week 3', value: totalRevenue * 0.25 },
            { name: 'Week 4', value: totalRevenue * 0.25 },
        ]
    });
};

// @desc    Manage user status (Admin)
// @route   PUT /api/users/:id/status
// @access  Private (Admin)
export const manageUserStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.status = status;
    await user.save();

    res.json({ message: `User status updated to ${status}` });
};
