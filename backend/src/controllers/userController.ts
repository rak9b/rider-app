import { Request, Response } from 'express';
import { mockUserStore } from '../utils/mockUserStore.js';

// Mock ride data for statistics
const mockRides = [
    { _id: '1', driver: '507f1f77bcf86cd799439012', status: 'COMPLETED', fare: 25.50 },
    { _id: '2', driver: '507f1f77bcf86cd799439012', status: 'COMPLETED', fare: 32.00 },
    { _id: '3', driver: '507f1f77bcf86cd799439015', status: 'COMPLETED', fare: 18.75 },
];

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: any, res: Response) => {
    const user = await mockUserStore.findById(req.user._id);

    if (user) {
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: any, res: Response) => {
    const user = await mockUserStore.findById(req.user._id);

    if (user) {
        const updateData: any = {};

        if (req.body.name) updateData.name = req.body.name;
        if (req.body.email) updateData.email = req.body.email;
        if (req.body.phone) updateData.phone = req.body.phone;

        if (user.role === 'driver') {
            if (req.body.isOnline !== undefined) updateData.isOnline = req.body.isOnline;
            if (req.body.vehicleDetails) updateData.vehicleDetails = req.body.vehicleDetails;
        }

        const updatedUser = await mockUserStore.updateOne(
            { _id: req.user._id },
            updateData
        );

        if (updatedUser) {
            const { password, ...userWithoutPassword } = updatedUser;
            res.json({
                ...userWithoutPassword,
                token: req.headers.authorization?.split(' ')[1] // return existing token
            });
        } else {
            res.status(400);
            throw new Error('Failed to update user');
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get driver stats
// @route   GET /api/users/driver/stats
// @access  Private (Driver)
export const getDriverStats = async (req: any, res: Response) => {
    // Filter rides for current driver
    const rides = mockRides.filter(ride => ride.driver === req.user._id && ride.status === 'COMPLETED');

    const totalEarnings = rides.reduce((acc, ride) => acc + (ride.fare || 0), 0);
    const totalRides = rides.length;

    // Mock weekly breakdown
    const weeklyStats = [
        { name: 'Mon', value: 45 },
        { name: 'Tue', value: 62 },
        { name: 'Wed', value: 78 },
        { name: 'Thu', value: 55 },
        { name: 'Fri', value: 92 },
        { name: 'Sat', value: 105 },
        { name: 'Sun', value: 88 },
    ];

    res.json({
        totalEarnings,
        totalRides,
        avgRating: req.user.rating || 4.9,
        weeklyStats
    });
};

// @desc    Get Admin analytics
// @route   GET /api/users/admin/analytics
// @access  Private (Admin)
export const getAdminAnalytics = async (req: Request, res: Response) => {
    const allUsers = await mockUserStore.find();

    const totalUsers = allUsers.length;
    const totalDrivers = allUsers.filter(u => u.role === 'driver').length;
    const totalRiders = allUsers.filter(u => u.role === 'rider').length;
    const totalRides = mockRides.length;
    const completedRides = mockRides.filter(r => r.status === 'COMPLETED').length;
    const totalRevenue = mockRides.reduce((acc, ride) => acc + (ride.fare || 0), 0);

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
        ],
        userGrowth: [
            { name: 'Jan', riders: 120, drivers: 45 },
            { name: 'Feb', riders: 180, drivers: 62 },
            { name: 'Mar', riders: 245, drivers: 78 },
            { name: 'Apr', riders: 320, drivers: 95 },
            { name: 'May', riders: totalRiders, drivers: totalDrivers },
        ]
    });
};

// @desc    Manage user status (Admin)
// @route   PUT /api/users/:id/status
// @access  Private (Admin)
export const manageUserStatus = async (req: Request, res: Response) => {
    const { status } = req.body;

    const user = await mockUserStore.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const updated = await mockUserStore.updateOne(
        { _id: req.params.id },
        { status }
    );

    if (updated) {
        res.json({ message: `User status updated to ${status}`, user: updated });
    } else {
        res.status(400);
        throw new Error('Failed to update user status');
    }
};
