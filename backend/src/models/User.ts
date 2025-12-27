import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (this: any, next: any) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
