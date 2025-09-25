import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './src/routes/auth.routes.js';
import userRouter from './src/routes/user.routes.js';
import patientRouter from './src/routes/patient.routes.js';
import doctorRouter from './src/routes/doctor.routes.js';
import adminRouter from './src/routes/admin.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

const PORT = process.env.PORT;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming body:", req.body);
  next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/patient', patientRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/admin', adminRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("DB Connected");
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.send("Welcome to MedTech");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
