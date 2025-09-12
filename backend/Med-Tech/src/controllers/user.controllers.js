// src/controllers/user.controllers.js
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get logged-in user profile
// @route   GET /api/user/me
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// @desc    Update logged-in user profile
// @route   PUT /api/user/me
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
});
