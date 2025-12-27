import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';
import mongoose from 'mongoose';

import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import authRoutes from './routes/authRoutes.js';
import rideRoutes from './routes/rideRoutes.js';
import userRoutes from './routes/userRoutes.js';

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
    res.json({ status: 'ok', message: 'Rider App API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/users', userRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Database connection & Server start
const startServer = async () => {
    try {
        // Note: In a production environment, you would use a real MongoDB URI
        // For now, we'll log that we're bypassing real DB connect if URI is default/placeholder
        if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('localhost')) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
        } else {
            console.log('Running in local/mock mode (DB connection skipped for initial setup)');
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();
