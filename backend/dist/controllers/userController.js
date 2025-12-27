"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageUserStatus = exports.getAdminAnalytics = exports.getDriverStats = exports.updateUserProfile = exports.getUserProfile = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const Ride_js_1 = __importDefault(require("../models/Ride.js"));
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User_js_1.default.findById(req.user._id);
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
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
};
exports.getUserProfile = getUserProfile;
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User_js_1.default.findById(req.user._id);
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
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
};
exports.updateUserProfile = updateUserProfile;
// @desc    Get driver stats
// @route   GET /api/users/driver/stats
// @access  Private (Driver)
const getDriverStats = async (req, res) => {
    const rides = await Ride_js_1.default.find({ driver: req.user._id, status: 'COMPLETED' });
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
exports.getDriverStats = getDriverStats;
// @desc    Get Admin analytics
// @route   GET /api/users/admin/analytics
// @access  Private (Admin)
const getAdminAnalytics = async (req, res) => {
    const totalUsers = await User_js_1.default.countDocuments();
    const totalDrivers = await User_js_1.default.countDocuments({ role: 'driver' });
    const totalRiders = await User_js_1.default.countDocuments({ role: 'rider' });
    const totalRides = await Ride_js_1.default.countDocuments();
    const completedRides = await Ride_js_1.default.countDocuments({ status: 'COMPLETED' });
    const rides = await Ride_js_1.default.find({ status: 'COMPLETED' });
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
exports.getAdminAnalytics = getAdminAnalytics;
// @desc    Manage user status (Admin)
// @route   PUT /api/users/:id/status
// @access  Private (Admin)
const manageUserStatus = async (req, res) => {
    const { status } = req.body;
    const user = await User_js_1.default.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    user.status = status;
    await user.save();
    res.json({ message: `User status updated to ${status}` });
};
exports.manageUserStatus = manageUserStatus;
