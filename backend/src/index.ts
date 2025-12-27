import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';

import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import authRoutes from './routes/authRoutes.js';
import rideRoutes from './routes/rideRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { mockUserStore } from './utils/mockUserStore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Rider App API is running',
        mode: 'Mock Mode (No Database)',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/users', userRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server start (No MongoDB connection needed)
const startServer = async () => {
    try {
        // Initialize mock user store
        await mockUserStore.initialize();

        console.log('\n🚀 ═══════════════════════════════════════════════════════════');
        console.log('   RIDER APP BACKEND - MOCK MODE');
        console.log('═══════════════════════════════════════════════════════════\n');
        console.log('✅ Running in MOCK MODE (No MongoDB required)');
        console.log('✅ In-memory user authentication active');
        console.log('✅ Test credentials ready to use\n');

        app.listen(PORT, () => {
            console.log(`🌐 Server running on: http://localhost:${PORT}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
            console.log(`🔐 Login endpoint: http://localhost:${PORT}/api/auth/login\n`);
            console.log('═══════════════════════════════════════════════════════════');
            console.log('🔑 TEST CREDENTIALS:');
            console.log('═══════════════════════════════════════════════════════════');
            console.log('👤 Rider:  rider@riderapp.com  / rider123');
            console.log('🚗 Driver: driver@riderapp.com / driver123');
            console.log('👨‍💼 Admin:  admin@riderapp.com  / admin123');
            console.log('═══════════════════════════════════════════════════════════\n');
            console.log('💡 Frontend Login: http://localhost:5173/login\n');
        });
    } catch (error) {
        console.error('❌ Server startup failed:', error);
        process.exit(1);
    }
};

startServer();
