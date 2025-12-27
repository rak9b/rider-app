import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    getDriverStats,
    getAdminAnalytics,
    manageUserStatus
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/driver/stats', authorize('driver'), getDriverStats);
router.get('/admin/analytics', authorize('admin'), getAdminAnalytics);
router.put('/:id/status', authorize('admin'), manageUserStatus);

export default router;
