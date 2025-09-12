// src/routes/user.routes.js
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/user.controllers.js";
import { body, validationResult } from "express-validator";

const userRouter = express.Router();

// Validation for updating profile
const validateProfileUpdate = [
  body("firstName").optional().isAlpha().withMessage("First name must contain only letters"),
  body("lastName").optional().isAlpha().withMessage("Last name must contain only letters"),
  body("phoneNumber")
    .optional()
    .matches(/^\+?[1-9]\d{9,14}$/)
    .withMessage("Phone number must be valid"),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of Birth must be valid (YYYY-MM-DD)")
    .toDate()
    .custom((value) => {
      if (value >= new Date()) {
        throw new Error("Date of Birth must be in the past");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

userRouter.get("/me", verifyToken, getProfile);
userRouter.put("/me", verifyToken, validateProfileUpdate, updateProfile);

export default userRouter;
