import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  console.log("Incoming body:", req.body); 

    const { Username, email, password, role } = req.body;

    if (!Username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUserName = await User.findOne({ Username});
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      Username,
      email,
      password: hashedPassword,
      role,
    });

    //success response (no password)

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        Username: newUser.Username,
        email: newUser.email,
        role: newUser.role,
      },
    });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({email});
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      id: existingUser._id,
      Username: existingUser.Username,
      email: existingUser.email,
      role: existingUser.role,
    };

    // sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        Username: existingUser.Username,
      },
    });
});
