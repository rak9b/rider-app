import { mockUserStore } from './mockUserStore.js';

export interface MockRide {
    _id: string;
    rider: any;
    driver?: any;
    pickupLocation: {
        address: string;
        coordinates?: { lat: number; lng: number };
    };
    destinationLocation: {
        address: string;
        coordinates?: { lat: number; lng: number };
    };
    status: 'REQUESTED' | 'ACCEPTED' | 'PICKED_UP' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED';
    fare: number;
    distance?: string;
    duration?: string;
    paymentMethod: 'cash' | 'card' | 'wallet';
    timeline: Array<{ status: string; timestamp: Date }>;
    createdAt: Date;
    updatedAt: Date;
}

const mockRidesData: MockRide[] = [
    {
        _id: 'ride-101',
        rider: '507f1f77bcf86cd799439011',
        driver: '507f1f77bcf86cd799439012',
        pickupLocation: { address: '123 Market St, San Francisco, CA' },
        destinationLocation: { address: '789 Mission St, San Francisco, CA' },
        status: 'COMPLETED',
        fare: 25.50,
        distance: '4.2 km',
        duration: '12 mins',
        paymentMethod: 'card',
        timeline: [
            { status: 'REQUESTED', timestamp: new Date(Date.now() - 3600000) },
            { status: 'ACCEPTED', timestamp: new Date(Date.now() - 3500000) },
            { status: 'COMPLETED', timestamp: new Date(Date.now() - 2800000) }
        ],
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 2800000)
    },
    {
        _id: 'ride-102',
        rider: '507f1f77bcf86cd799439014',
        driver: '507f1f77bcf86cd799439015',
        pickupLocation: { address: '456 Howard St, San Francisco, CA' },
        destinationLocation: { address: '101 California St, San Francisco, CA' },
        status: 'COMPLETED',
        fare: 18.75,
        distance: '3.1 km',
        duration: '9 mins',
        paymentMethod: 'cash',
        timeline: [
            { status: 'REQUESTED', timestamp: new Date(Date.now() - 7200000) },
            { status: 'COMPLETED', timestamp: new Date(Date.now() - 6500000) }
        ],
        createdAt: new Date(Date.now() - 7200000),
        updatedAt: new Date(Date.now() - 6500000)
    }
];

class MockRideStore {
    private rides: MockRide[] = mockRidesData;

    async create(rideData: Partial<MockRide>): Promise<MockRide> {
        const newRide: MockRide = {
            _id: `ride-${Date.now()}`,
            rider: rideData.rider,
            driver: rideData.driver,
            pickupLocation: rideData.pickupLocation || { address: 'Unknown Pickup' },
            destinationLocation: rideData.destinationLocation || { address: 'Unknown Destination' },
            status: rideData.status || 'REQUESTED',
            fare: typeof rideData.fare === 'string' ? parseFloat(rideData.fare) : (rideData.fare || 15.00),
            distance: rideData.distance || '5.0 km',
            duration: rideData.duration || '15 mins',
            paymentMethod: rideData.paymentMethod || 'cash',
            timeline: rideData.timeline || [{ status: 'REQUESTED', timestamp: new Date() }],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.rides.unshift(newRide);
        return newRide;
    }

    async find(query: any = {}): Promise<MockRide[]> {
        let results = [...this.rides];
        if (query.rider) {
            results = results.filter(r => (typeof r.rider === 'object' ? r.rider._id : r.rider) === query.rider);
        }
        if (query.driver) {
            results = results.filter(r => (typeof r.driver === 'object' ? r.driver._id : r.driver) === query.driver);
        }
        if (query.status) {
            results = results.filter(r => r.status === query.status);
        }

        // Populate rider and driver objects
        return Promise.all(results.map(async r => {
            const riderObj = typeof r.rider === 'string' ? await mockUserStore.findById(r.rider) : r.rider;
            const driverObj = typeof r.driver === 'string' ? await mockUserStore.findById(r.driver) : r.driver;
            return {
                ...r,
                rider: riderObj ? { _id: riderObj._id, name: riderObj.name, email: riderObj.email, phone: riderObj.phone } : r.rider,
                driver: driverObj ? { _id: driverObj._id, name: driverObj.name, email: driverObj.email, phone: driverObj.phone, vehicleDetails: driverObj.vehicleDetails } : r.driver
            };
        }));
    }

    async findById(id: string): Promise<MockRide | null> {
        const ride = this.rides.find(r => r._id === id);
        if (!ride) return null;
        const riderObj = typeof ride.rider === 'string' ? await mockUserStore.findById(ride.rider) : ride.rider;
        const driverObj = typeof ride.driver === 'string' ? await mockUserStore.findById(ride.driver) : ride.driver;
        return {
            ...ride,
            rider: riderObj ? { _id: riderObj._id, name: riderObj.name, email: riderObj.email, phone: riderObj.phone } : ride.rider,
            driver: driverObj ? { _id: driverObj._id, name: driverObj.name, email: driverObj.email, phone: driverObj.phone, vehicleDetails: driverObj.vehicleDetails } : ride.driver
        };
    }

    async updateOne(id: string, update: Partial<MockRide>): Promise<MockRide | null> {
        const index = this.rides.findIndex(r => r._id === id);
        if (index === -1) return null;
        this.rides[index] = {
            ...this.rides[index],
            ...update,
            updatedAt: new Date()
        };
        return this.rides[index];
    }

    async countDocuments(query: any = {}): Promise<number> {
        const items = await this.find(query);
        return items.length;
    }
}

export const mockRideStore = new MockRideStore();
