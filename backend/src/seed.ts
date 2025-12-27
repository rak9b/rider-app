import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

// Test user credentials
const users = [
    {
        name: 'John Rider',
        email: 'rider@riderapp.com',
        password: 'rider123',
        role: 'rider',
        status: 'active',
        phone: '+1 (555) 100-0001',
        rating: 4.8,
    },
    {
        name: 'Mike Driver',
        email: 'driver@riderapp.com',
        password: 'driver123',
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
    },
    {
        name: 'Admin User',
        email: 'admin@riderapp.com',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        phone: '+1 (555) 300-0003',
        rating: 5.0,
    },
    // Additional test users
    {
        name: 'Sarah Rider',
        email: 'sarah.rider@riderapp.com',
        password: 'rider123',
        role: 'rider',
        status: 'active',
        phone: '+1 (555) 100-0004',
        rating: 4.7,
    },
    {
        name: 'Tom Driver',
        email: 'tom.driver@riderapp.com',
        password: 'driver123',
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
    },
    {
        name: 'Emma Premium Driver',
        email: 'emma.driver@riderapp.com',
        password: 'driver123',
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
    },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('localhost')) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✅ Connected to MongoDB');
        } else {
            console.log('⚠️  No MongoDB URI found. Using mock mode.');
            console.log('📝 Test credentials are still available below:\n');
            displayCredentials();
            process.exit(0);
        }

        // Clear existing users
        await User.deleteMany({});
        console.log('🗑️  Cleared existing users');

        // Hash passwords and insert users
        for (const userData of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            await User.create({
                ...userData,
                password: hashedPassword,
            });
        }

        console.log('✅ Test users created successfully!\n');
        displayCredentials();

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

const displayCredentials = () => {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔑 TEST CREDENTIALS FOR RIDER APP');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('👤 RIDER ACCOUNT #1');
    console.log('   Email:    rider@riderapp.com');
    console.log('   Password: rider123');
    console.log('   Role:     Rider\n');

    console.log('👤 RIDER ACCOUNT #2');
    console.log('   Email:    sarah.rider@riderapp.com');
    console.log('   Password: rider123');
    console.log('   Role:     Rider\n');

    console.log('🚗 DRIVER ACCOUNT #1');
    console.log('   Email:    driver@riderapp.com');
    console.log('   Password: driver123');
    console.log('   Role:     Driver');
    console.log('   Vehicle:  Toyota Camry 2022\n');

    console.log('🚗 DRIVER ACCOUNT #2');
    console.log('   Email:    tom.driver@riderapp.com');
    console.log('   Password: driver123');
    console.log('   Role:     Driver');
    console.log('   Vehicle:  Honda Accord 2023\n');

    console.log('🚗 PREMIUM DRIVER ACCOUNT');
    console.log('   Email:    emma.driver@riderapp.com');
    console.log('   Password: driver123');
    console.log('   Role:     Driver');
    console.log('   Vehicle:  Tesla Model S 2024\n');

    console.log('👨‍💼 ADMIN ACCOUNT');
    console.log('   Email:    admin@riderapp.com');
    console.log('   Password: admin123');
    console.log('   Role:     Admin\n');

    console.log('═══════════════════════════════════════════════════════════');
    console.log('💡 LOGIN URL: http://localhost:5173/login');
    console.log('═══════════════════════════════════════════════════════════\n');
};

// Run seeder
seedDatabase();
