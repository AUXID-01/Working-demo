import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";

// Register doctor
export const registerDoctor = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    hospitalName,
    clinicAddress,
    consultationTimings,
    consultationFee,
    degreeCertificate,
    idProof,
    registrationNumber,
    specialization,
    experienceYears,
    qualifications,
  } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !hospitalName ||
    !clinicAddress ||
    !consultationTimings ||
    !consultationFee ||
    !degreeCertificate ||
    !idProof ||
    !registrationNumber ||
    !specialization ||
    !experienceYears ||
    !qualifications
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
    role: "doctor",
  });

  const doctor = await Doctor.create({
    user: user._id,
    hospitalName,
    clinicAddress,
    consultationTimings,
    consultationFee,
    degreeCertificate,
    idProof,
    registrationNumber,
    specialization,
    experienceYears,
    qualifications,
  });

  const payload = { id: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res
    .status(201)
    .json({ message: "Doctor registered successfully", token, user, doctor });
});

// Get doctor profile
export const getDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ user: req.user.id }).populate(
    "user",
    "-password"
  );
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.json(doctor);
});
