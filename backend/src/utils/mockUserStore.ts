import bcrypt from 'bcryptjs';

// In-memory user storage for development (no MongoDB needed)
interface MockUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'rider' | 'driver' | 'admin';
    status: 'active' | 'blocked' | 'suspended';
    phone?: string;
    rating?: number;
    isOnline?: boolean;
    vehicleDetails?: {
        model: string;
        plateNumber: string;
        type: string;
    };
    createdAt: Date;
}

// Pre-hashed passwords for instant access
const HASHED_RIDER_PASSWORD = '$2a$10$YQvN5Y6B6Z5Y6B6Z5Y6B6eFqHwYhYmYqHwYhYmYqHwYhYmYqHwYhY'; // rider123
const HASHED_DRIVER_PASSWORD = '$2a$10$XQvN5Y6B6Z5Y6B6Z5Y6B6eFqHwYhYmYqHwYhYmYqHwYhYmYqHwXhX'; // driver123
const HASHED_ADMIN_PASSWORD = '$2a$10$ZQvN5Y6B6Z5Y6B6Z5Y6B6eFqHwYhYmYqHwYhYmYqHwYhYmYqHwZhZ'; // admin123

// In-memory user database
const mockUsers: MockUser[] = [
    {
        _id: '507f1f77bcf86cd799439011',
        name: 'John Rider',
        email: 'rider@riderapp.com',
        password: HASHED_RIDER_PASSWORD,
        role: 'rider',
        status: 'active',
        phone: '+1 (555) 100-0001',
        rating: 4.8,
        createdAt: new Date(),
    },
    {
        _id: '507f1f77bcf86cd799439012',
        name: 'Mike Driver',
        email: 'driver@riderapp.com',
        password: HASHED_DRIVER_PASSWORD,
        role: 'driver',
        status: 'active',
        phone: '+1 (555) 200-0002',
        rating: 4.9,
        isOnline: true,
        vehicleDetails: {
            model: 'Toyota Camry 2022',
            plateNumber: 'ABC-1234',
            type: 'car',
        },
        createdAt: new Date(),
    },
    {
        _id: '507f1f77bcf86cd799439013',
        name: 'Admin User',
        email: 'admin@riderapp.com',
        password: HASHED_ADMIN_PASSWORD,
        role: 'admin',
        status: 'active',
        phone: '+1 (555) 300-0003',
        rating: 5.0,
        createdAt: new Date(),
    },
    {
        _id: '507f1f77bcf86cd799439014',
        name: 'Sarah Rider',
        email: 'sarah.rider@riderapp.com',
        password: HASHED_RIDER_PASSWORD,
        role: 'rider',
        status: 'active',
        phone: '+1 (555) 100-0004',
        rating: 4.7,
        createdAt: new Date(),
    },
    {
        _id: '507f1f77bcf86cd799439015',
        name: 'Tom Driver',
        email: 'tom.driver@riderapp.com',
        password: HASHED_DRIVER_PASSWORD,
        role: 'driver',
        status: 'active',
        phone: '+1 (555) 200-0005',
        rating: 4.85,
        isOnline: false,
        vehicleDetails: {
            model: 'Honda Accord 2023',
            plateNumber: 'XYZ-5678',
            type: 'car',
        },
        createdAt: new Date(),
    },
    {
        _id: '507f1f77bcf86cd799439016',
        name: 'Emma Premium Driver',
        email: 'emma.driver@riderapp.com',
        password: HASHED_DRIVER_PASSWORD,
        role: 'driver',
        status: 'active',
        phone: '+1 (555) 200-0006',
        rating: 5.0,
        isOnline: true,
        vehicleDetails: {
            model: 'Tesla Model S 2024',
            plateNumber: 'TES-9999',
            type: 'premium',
        },
        createdAt: new Date(),
    },
];

// Hash passwords on initialization
async function initializeMockUsers() {
    const salt = await bcrypt.genSalt(10);

    for (const user of mockUsers) {
        if (user.email === 'rider@riderapp.com' || user.email === 'sarah.rider@riderapp.com') {
            user.password = await bcrypt.hash('rider123', salt);
        } else if (user.role === 'driver') {
            user.password = await bcrypt.hash('driver123', salt);
        } else if (user.role === 'admin') {
            user.password = await bcrypt.hash('admin123', salt);
        }
    }

    console.log('✅ Mock users initialized with credentials:');
    console.log('   Rider: rider@riderapp.com / rider123');
    console.log('   Driver: driver@riderapp.com / driver123');
    console.log('   Admin: admin@riderapp.com / admin123');
}

class MockUserStore {
    private users: MockUser[];
    private initialized: boolean = false;

    constructor() {
        this.users = mockUsers;
    }

    async initialize() {
        if (!this.initialized) {
            await initializeMockUsers();
            this.initialized = true;
        }
    }

    async findOne(query: { email?: string; _id?: string }) {
        await this.initialize();

        if (query.email) {
            return this.users.find(u => u.email === query.email) || null;
        }
        if (query._id) {
            return this.users.find(u => u._id === query._id) || null;
        }
        return null;
    }

    async findById(id: string) {
        await this.initialize();
        return this.users.find(u => u._id === id) || null;
    }

    async create(userData: Partial<MockUser>) {
        await this.initialize();

        const newUser: MockUser = {
            _id: Date.now().toString(),
            name: userData.name || 'New User',
            email: userData.email || '',
            password: userData.password || '',
            role: userData.role || 'rider',
            status: userData.status || 'active',
            phone: userData.phone,
            rating: userData.rating || 5.0,
            createdAt: new Date(),
        };

        // Hash password if not already hashed
        if (userData.password && !userData.password.startsWith('$2a$')) {
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(userData.password, salt);
        }

        this.users.push(newUser);
        return newUser;
    }

    async updateOne(query: { _id: string }, update: any) {
        await this.initialize();

        const userIndex = this.users.findIndex(u => u._id === query._id);
        if (userIndex === -1) return null;

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...update,
        };

        return this.users[userIndex];
    }

    async matchPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    async find(query?: any) {
        await this.initialize();

        if (!query || Object.keys(query).length === 0) {
            return this.users;
        }

        return this.users.filter(user => {
            return Object.keys(query).every(key => {
                return (user as any)[key] === query[key];
            });
        });
    }

    async deleteMany(query?: any) {
        await this.initialize();

        if (!query || Object.keys(query).length === 0) {
            const count = this.users.length;
            this.users = [];
            return { deletedCount: count };
        }

        const initialLength = this.users.length;
        this.users = this.users.filter(user => {
            return !Object.keys(query).every(key => {
                return (user as any)[key] === query[key];
            });
        });

        return { deletedCount: initialLength - this.users.length };
    }
}

export const mockUserStore = new MockUserStore();
export type { MockUser };
