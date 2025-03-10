const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Project = require("../models/Project");

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password")
      .populate({
        path: "createdProjects",
        select: "title imageUrl shortDescription currentAmount goalAmount backers endDate status",
      })
      .populate({
        path: "backedProjects.project",
        select: "title imageUrl shortDescription currentAmount goalAmount endDate status",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -email -backedProjects")
      .populate({
        path: "createdProjects",
        select: "title imageUrl shortDescription currentAmount goalAmount backers endDate status",
        match: { status: "active" },
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/me
// @desc    Update current user profile
// @access  Private
router.put("/me", auth, async (req, res) => {
  try {
    const {
      name,
      avatar,
      bio,
      location,
      website,
      socialLinks,
    } = req.body;

    // Build user object
    const userFields = {};
    if (name) userFields.name = name;
    if (avatar) userFields.avatar = avatar;
    if (bio) userFields.bio = bio;
    if (location) userFields.location = location;
    if (website) userFields.website = website;
    if (socialLinks) userFields.socialLinks = socialLinks;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: userFields },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide both current and new password" });
    }

    // Find user
    const user = await User.findById(req.user.userId);

    // Check if current password is correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users/me/backed-projects
// @desc    Get current user's backed projects
// @access  Private
router.get("/me/backed-projects", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate({
        path: "backedProjects.project",
        select: "title imageUrl shortDescription currentAmount goalAmount backers endDate status",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.backedProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users/me/created-projects
// @desc    Get current user's created projects
// @access  Private
router.get("/me/created-projects", auth, async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.userId })
      .select("title imageUrl shortDescription currentAmount goalAmount backers endDate status createdAt");

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 