"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rideController_js_1 = require("../controllers/rideController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.use(authMiddleware_js_1.protect);
router.get('/', rideController_js_1.getRides);
router.post('/estimate', (0, authMiddleware_js_1.authorize)('rider'), rideController_js_1.getRideEstimate);
router.post('/request', (0, authMiddleware_js_1.authorize)('rider'), rideController_js_1.requestRide);
router.put('/:id/accept', (0, authMiddleware_js_1.authorize)('driver'), rideController_js_1.acceptRide);
router.put('/:id/status', (0, authMiddleware_js_1.authorize)('driver'), rideController_js_1.updateRideStatus);
exports.default = router;
