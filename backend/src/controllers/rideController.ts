import { Request, Response } from 'express';
import Ride from '../models/Ride.js';
import User from '../models/User.js';

// @desc    Get ride estimate
// @route   POST /api/rides/estimate
// @access  Private (Rider)
export const getRideEstimate = async (req: Request, res: Response) => {
    const { pickup, destination, vehicleType } = req.body;

    // Mock fare calculation logic
    const baseFare = vehicleType === 'premium' ? 10 : vehicleType === 'car' ? 5 : 2;
    const distance = (Math.random() * 10 + 1).toFixed(2); // Mock distance 1-11 km
    const fare = (parseFloat(distance) * 2 + baseFare).toFixed(2);
    const duration = (parseFloat(distance) * 3).toFixed(0) + ' mins';

    res.json({
        fare,
        distance: distance + ' km',
        duration,
    });
};

// @desc    Request a ride
// @route   POST /api/rides/request
// @access  Private (Rider)
export const requestRide = async (req: any, res: Response) => {
    const { pickupLocation, destinationLocation, fare, distance, duration, paymentMethod } = req.body;

    const ride = await Ride.create({
        rider: req.user._id,
        pickupLocation,
        destinationLocation,
        fare,
        distance,
        duration,
        paymentMethod,
        status: 'REQUESTED',
        timeline: [{ status: 'REQUESTED' }]
    });

    res.status(201).json(ride);
};

// @desc    Get all rides (Admin) or user rides
// @route   GET /api/rides
// @access  Private
export const getRides = async (req: any, res: Response) => {
    let query: any = {};

    if (req.user.role === 'rider') {
        query.rider = req.user._id;
    } else if (req.user.role === 'driver') {
        query.driver = req.user._id;
    }
    // Admin sees all

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const items = await Ride.find(query)
        .populate('rider', 'name email phone')
        .populate('driver', 'name email phone vehicleDetails')
        .sort('-createdAt')
        .skip(skip)
        .limit(limit);

    const total = await Ride.countDocuments(query);

    res.json({
        items,
        page,
        pages: Math.ceil(total / limit),
        total
    });
};

// @desc    Accept a ride
// @route   PUT /api/rides/:id/accept
// @access  Private (Driver)
export const acceptRide = async (req: any, res: Response) => {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
        res.status(404);
        throw new Error('Ride not found');
    }

    if (ride.status !== 'REQUESTED') {
        res.status(400);
        throw new Error('Ride is no longer available');
    }

    ride.driver = req.user._id;
    ride.status = 'ACCEPTED';
    ride.timeline.push({ status: 'ACCEPTED' });

    await ride.save();

    res.json(ride);
};

// @desc    Update ride status
// @route   PUT /api/rides/:id/status
// @access  Private (Driver)
export const updateRideStatus = async (req: any, res: Response) => {
    const { status } = req.body;
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
        res.status(404);
        throw new Error('Ride not found');
    }

    // Verify it's the correct driver
    if (ride.driver?.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this ride');
    }

    ride.status = status;
    ride.timeline.push({ status });

    await ride.save();

    res.json(ride);
};
