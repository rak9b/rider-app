"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ['rider', 'driver', 'admin'],
        default: 'rider',
    },
    status: {
        type: String,
        enum: ['active', 'blocked', 'suspended', 'pending'],
        default: 'active',
    },
    phone: {
        type: String,
    },
    // Driver specific fields
    isOnline: {
        type: Boolean,
        default: false,
    },
    vehicleDetails: {
        model: String,
        plateNumber: String,
        type: {
            type: String,
            enum: ['bike', 'car', 'premium'],
        },
    },
    rating: {
        type: Number,
        default: 5,
    },
    emergencyContacts: [
        {
            name: String,
            phone: String,
            relationship: String,
        },
    ],
}, {
    timestamps: true,
});
// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
exports.default = mongoose_1.default.model('User', userSchema);
