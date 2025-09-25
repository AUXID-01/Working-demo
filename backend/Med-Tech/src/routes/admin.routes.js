import express from 'express';
import { registerAdmin, getAdminProfile } from '../controllers/admin.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin registration (public)
router.post('/register', registerAdmin);

// Get logged-in admin profile (protected)
router.get('/me', verifyToken, getAdminProfile);

export default router;
