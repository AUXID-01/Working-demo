import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hospitalName: { type: String, required: true },
    clinicAddress: { type: String, required: true },
    consultationTimings: { type: String, required: true },
    consultationFee: { type: Number, required: true },

    // Verification documents stored as file URLs/paths (you'll need a file upload setup for these)
    degreeCertificate: { type: String, required: true },
    idProof: { type: String, required: true },

    registrationNumber: { type: String, required: true },
    specialization: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    qualifications: { type: String, required: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
