import { Request, Response } from 'express';
import { mockRideStore } from '../utils/mockRideStore.js';

// @desc    Get ride estimate
// @route   POST /api/rides/estimate
// @access  Private (Rider)
export const getRideEstimate = async (req: Request, res: Response) => {
    const { vehicleType } = req.body;

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

    if (!pickupLocation || !destinationLocation) {
        res.status(400);
        throw new Error('Pickup and destination locations are required');
    }

    const ride = await mockRideStore.create({
        rider: req.user._id,
        pickupLocation: typeof pickupLocation === 'string' ? { address: pickupLocation } : pickupLocation,
        destinationLocation: typeof destinationLocation === 'string' ? { address: destinationLocation } : destinationLocation,
        fare: typeof fare === 'string' ? parseFloat(fare) : (fare || 15.0),
        distance: distance || '5.0 km',
        duration: duration || '15 mins',
        paymentMethod: paymentMethod || 'cash',
        status: 'REQUESTED',
        timeline: [{ status: 'REQUESTED', timestamp: new Date() }]
    });

    res.status(201).json(ride);
};

// @desc    Get all rides (Admin) or user rides
// @route   GET /api/rides
// @access  Private
export const getRides = async (req: any, res: Response) => {
    const query: any = {};

    if (req.user.role === 'rider') {
        query.rider = req.user._id;
    } else if (req.user.role === 'driver') {
        query.driver = req.user._id;
    }
    if (req.query.status) {
        query.status = req.query.status;
    }
    // Admin sees all

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const allMatchingRides = await mockRideStore.find(query);
    const total = allMatchingRides.length;

    const skip = (page - 1) * limit;
    const items = allMatchingRides.slice(skip, skip + limit);

    res.json({
        items,
        page,
        pages: Math.ceil(total / limit) || 1,
        total
    });
};

// @desc    Accept a ride
// @route   PUT /api/rides/:id/accept
// @access  Private (Driver)
export const acceptRide = async (req: any, res: Response) => {
    const ride = await mockRideStore.findById(req.params.id);

    if (!ride) {
        res.status(404);
        throw new Error('Ride not found');
    }

    if (ride.status !== 'REQUESTED') {
        res.status(400);
        throw new Error('Ride is no longer available');
    }

    const updatedRide = await mockRideStore.updateOne(req.params.id, {
        driver: req.user._id,
        status: 'ACCEPTED',
        timeline: [...ride.timeline, { status: 'ACCEPTED', timestamp: new Date() }]
    });

    res.json(updatedRide);
};

// @desc    Update ride status
// @route   PUT /api/rides/:id/status
// @access  Private (Driver)
export const updateRideStatus = async (req: any, res: Response) => {
    const { status } = req.body;
    const ride = await mockRideStore.findById(req.params.id);

    if (!ride) {
        res.status(404);
        throw new Error('Ride not found');
    }

    // Verify it's the correct driver
    const driverId = typeof ride.driver === 'object' ? ride.driver._id : ride.driver;
    if (driverId?.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this ride');
    }

    const updatedRide = await mockRideStore.updateOne(req.params.id, {
        status,
        timeline: [...ride.timeline, { status, timestamp: new Date() }]
    });

    res.json(updatedRide);
};
