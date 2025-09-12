import { login, register } from "../controllers/auth.controllers.js";
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {body, validationResult} from 'express-validator';

const authRouter = express.Router();


// Validation middleware for registration

const validateRegistration = [
  body('Username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/).withMessage('Password must be at least 6 characters long, with uppercase, lowercase, number, and special character'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation middleware for login

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);   
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Routes
authRouter.post("/register", validateRegistration, register);
authRouter.post("/login", validateLogin, login);

authRouter.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "This is a protected profile route", user: req.user });
});

export default authRouter;
