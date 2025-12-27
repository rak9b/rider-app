import express from 'express';
import {
    getRideEstimate,
    requestRide,
    getRides,
    acceptRide,
    updateRideStatus
} from '../controllers/rideController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getRides);
router.post('/estimate', authorize('rider'), getRideEstimate);
router.post('/request', authorize('rider'), requestRide);
router.put('/:id/accept', authorize('driver'), acceptRide);
router.put('/:id/status', authorize('driver'), updateRideStatus);

export default router;
