"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const notFound_js_1 = require("./middleware/notFound.js");
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const rideRoutes_js_1 = __importDefault(require("./routes/rideRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Rider App API is running' });
});
app.use('/api/auth', authRoutes_js_1.default);
app.use('/api/rides', rideRoutes_js_1.default);
app.use('/api/users', userRoutes_js_1.default);
// Error Handling
app.use(notFound_js_1.notFound);
app.use(errorHandler_js_1.errorHandler);
// Database connection & Server start
const startServer = async () => {
    try {
        // Note: In a production environment, you would use a real MongoDB URI
        // For now, we'll log that we're bypassing real DB connect if URI is default/placeholder
        if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('localhost')) {
            await mongoose_1.default.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
        }
        else {
            console.log('Running in local/mock mode (DB connection skipped for initial setup)');
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};
startServer();
