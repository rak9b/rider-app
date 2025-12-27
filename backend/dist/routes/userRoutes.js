"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.use(authMiddleware_js_1.protect);
router.get('/profile', userController_js_1.getUserProfile);
router.put('/profile', userController_js_1.updateUserProfile);
router.get('/driver/stats', (0, authMiddleware_js_1.authorize)('driver'), userController_js_1.getDriverStats);
router.get('/admin/analytics', (0, authMiddleware_js_1.authorize)('admin'), userController_js_1.getAdminAnalytics);
router.put('/:id/status', (0, authMiddleware_js_1.authorize)('admin'), userController_js_1.manageUserStatus);
exports.default = router;
