import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  emergencyContact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Emergency contact must be 10 digits"]
  },
  medicalHistory: {
    type: String // or [String] if storing a list
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true
  }
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
