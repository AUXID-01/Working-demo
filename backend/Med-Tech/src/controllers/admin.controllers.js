import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

// Register admin
export const registerAdmin = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    employeeId,
    adminRole,
    organizationName,
    contactNumber,
  } = req.body;

  // Validate enum values explicitly before saving
  const validAdminRoles = ["SuperAdmin", "SubAdmin"]; // define exact valid roles here
  if (!validAdminRoles.includes(adminRole)) {
    return res.status(400).json({ message: "Invalid adminRole value" });
  }

  if (
    !username ||
    !email ||
    !password ||
    !employeeId ||
    !adminRole ||
    !organizationName ||
    !contactNumber
  )
    return res.status(400).json({ message: "Required fields missing" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    role: "admin",
  });

  const admin = await Admin.create({
    user: user._id,
    employeeId,
    adminRole,
    organizationName,
    contactNumber,
  });

  const payload = { id: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res
    .status(201)
    .json({ message: "Admin registered successfully", token, user, admin });
});

// Get admin profile
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ user: req.user.id }).populate(
    "user",
    "-password"
  );
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
});
