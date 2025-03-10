const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Project = require("../models/Project");
const User = require("../models/User");

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, search, sort, status } = req.query;
    const query = {};

    // Apply filters
    if (category) {
      query.category = category;
    }
    
    if (status) {
      query.status = status;
    } else {
      // By default, only show active projects
      query.status = "active";
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort options
    let sortOptions = {};
    if (sort === "newest") {
      sortOptions = { createdAt: -1 };
    } else if (sort === "endingSoon") {
      sortOptions = { endDate: 1 };
    } else if (sort === "mostFunded") {
      sortOptions = { currentAmount: -1 };
    } else if (sort === "mostBackers") {
      sortOptions = { backers: -1 };
    } else {
      // Default sort: featured projects first, then trending, then newest
      sortOptions = { featured: -1, trending: -1, createdAt: -1 };
    }

    const projects = await Project.find(query)
      .populate("createdBy", "name avatar")
      .sort(sortOptions);

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/category-counts
// @desc    Get project counts by category
// @access  Public
router.get("/category-counts", async (req, res) => {
  try {
    const categoryCounts = await Project.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const result = {};
    categoryCounts.forEach((item) => {
      result[item._id] = item.count;
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name avatar bio")
      .populate("comments.user", "name avatar");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/projects
// @desc    Create a project
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      category,
      tags,
      imageUrl,
      galleryImages,
      videoUrl,
      goalAmount,
      endDate,
      rewards,
      faqs,
    } = req.body;

    const newProject = new Project({
      title,
      shortDescription,
      description,
      category,
      tags,
      imageUrl,
      galleryImages,
      videoUrl,
      goalAmount,
      endDate,
      createdBy: req.user.userId,
      rewards: rewards || [],
      faqs: faqs || [],
      status: "active",
    });

    const project = await newProject.save();

    // Add project to user's createdProjects array
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { createdProjects: project._id },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is the project creator
    if (project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    // Don't allow editing completed or cancelled projects
    if (["completed", "cancelled"].includes(project.status)) {
      return res.status(400).json({ message: "Cannot edit completed or cancelled projects" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is the project creator
    if (project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    // Don't allow deleting projects with backers
    if (project.backers > 0) {
      return res.status(400).json({ message: "Cannot delete a project that has backers" });
    }

    await project.deleteOne();

    // Remove project from user's createdProjects array
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { createdProjects: req.params.id },
    });

    res.json({ message: "Project removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/related
// @desc    Get related projects by category
// @access  Public
router.get("/related", async (req, res) => {
  try {
    const { category, exclude } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const query = {
      category,
      status: "active",
    };

    if (exclude) {
      query._id = { $ne: exclude };
    }

    const projects = await Project.find(query)
      .populate("createdBy", "name avatar")
      .limit(4);

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/projects/:id/comments
// @desc    Add a comment to a project
// @access  Private
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newComment = {
      user: req.user.userId,
      content,
    };

    project.comments.unshift(newComment);
    await project.save();

    // Populate user data for the new comment
    const populatedProject = await Project.findById(req.params.id)
      .populate("comments.user", "name avatar");

    res.json(populatedProject.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 