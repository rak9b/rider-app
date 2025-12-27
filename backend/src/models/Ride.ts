import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema(
    {
        rider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        pickupLocation: {
            address: { type: String, required: true },
            coordinates: {
                lat: Number,
                lng: Number,
            },
        },
        destinationLocation: {
            address: { type: String, required: true },
            coordinates: {
                lat: Number,
                lng: Number,
            },
        },
        status: {
            type: String,
            enum: [
                'REQUESTED',
                'ACCEPTED',
                'PICKED_UP',
                'IN_TRANSIT',
                'COMPLETED',
                'CANCELLED',
            ],
            default: 'REQUESTED',
        },
        fare: {
            type: Number,
            required: true,
        },
        distance: String,
        duration: String,
        paymentMethod: {
            type: String,
            enum: ['cash', 'card', 'wallet'],
            default: 'cash',
        },
        timeline: [
            {
                status: String,
                timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Ride', rideSchema);
