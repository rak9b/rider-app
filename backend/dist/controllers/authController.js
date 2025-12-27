"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User_js_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User_js_1.default.create({
        name,
        email,
        password,
        role,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            token: (0, generateToken_js_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};
exports.registerUser = registerUser;
// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_js_1.default.findOne({ email }).select('+password');
    if (user && (await user.matchPassword(password))) {
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
            token: (0, generateToken_js_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
};
exports.loginUser = loginUser;
