import express from 'express';
import { registerDoctor, getDoctorProfile } from '../controllers/doctor.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Doctor registration (public)
router.post('/register', registerDoctor);

// Get logged-in doctor profile (protected)
router.get('/me', verifyToken, getDoctorProfile);

export default router;
