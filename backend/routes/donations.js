const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Donation = require('../models/Donation');

// Make a donation
router.post('/', auth, async (req, res) => {
  try {
    const { projectId, amount } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const newDonation = new Donation({
      project: projectId,
      user: req.user.id,
      amount,
    });

    const donation = await newDonation.save();

    // Update project's current amount
    project.currentAmount += amount;
    await project.save();

    res.json(donation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;