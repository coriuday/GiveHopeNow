const { paypalClient } = require('../config/paymentConfig');
const paypal = require('@paypal/checkout-server-sdk');
const Donation = require('../models/Donation');
const Project = require('../models/Project');

const createPayment = async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'INR', // Changed from USD to INR
          value: req.body.amount
        }
      }]
    });

    const order = await paypalClient.execute(request);
    res.json({ orderId: order.result.id });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Error creating payment' });
  }
};

const capturePayment = async (req, res) => {
  const { orderId } = req.body;
  
  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    const capture = await paypalClient.execute(request);
    res.json({ captureId: capture.result.id });
  } catch (error) {
    console.error('Error capturing payment:', error);
    res.status(500).json({ error: 'Error capturing payment' });
  }
};

/* Razorpay payment handlers - Commented for future use
const createRazorpayOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Razorpay amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpayClient.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Error creating payment' });
  }
};

const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // Add verification logic here
    res.json({ verified: true });
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    res.status(500).json({ error: 'Error verifying payment' });
  }
};
*/

const createDonation = async (projectId, userId, amount, paymentId, paymentMethod) => {
  const newDonation = new Donation({
    project: projectId,
    user: userId,
    amount,
    paymentId,
    paymentMethod
  });

  const donation = await newDonation.save();

  // Update project's current amount
  const project = await Project.findById(projectId);
  project.currentAmount += amount;
  await project.save();

  return donation;
};

module.exports = {
  createPayment,
  capturePayment,
  createDonation,
  // createRazorpayOrder,     // Uncomment when implementing Razorpay
  // verifyRazorpayPayment,   // Uncomment when implementing Razorpay
};
