import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  adminRole: {
    type: String,
    required: true,
    enum: ["SuperAdmin" , "SubAdmin"]
  },
  organizationName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true,
    match: [/^\+?\d{10,15}$/, "Contact number must be valid"]
  }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
