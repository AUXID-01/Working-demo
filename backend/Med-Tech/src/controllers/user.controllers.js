import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get logged-in user profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Update logged-in user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const updates = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!updatedUser) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Profile updated successfully", user: updatedUser });
});
