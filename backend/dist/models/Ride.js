"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rideSchema = new mongoose_1.default.Schema({
    rider: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    driver: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Ride', rideSchema);
