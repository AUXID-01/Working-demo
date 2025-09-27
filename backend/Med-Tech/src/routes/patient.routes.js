import express from 'express';
import { registerPatient, getPatientProfile } from '../controllers/patient.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Patient registration (public)
router.post('/register', registerPatient);

// Get logged-in patient profile (protected)
router.get('/me', verifyToken, getPatientProfile);

export default router;
