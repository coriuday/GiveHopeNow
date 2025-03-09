const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');



// Make a donation
router.post('/', auth, async (req, res) => {
  try {
    const { projectId, amount, paymentMethod } = req.body;
    
    // Process payment
    const paymentResult = await paymentController.processPayment(paymentMethod, amount);
    
    // Create donation record
    const donation = await paymentController.createDonation(
      projectId,
      req.user.id,
      amount,
      paymentResult.id,
      paymentMethod
    );

    res.json({
      donation,
      paymentDetails: paymentResult
    });


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
