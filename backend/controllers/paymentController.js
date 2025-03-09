const { paypalClient, razorpayClient } = require('../config/paymentConfig');
const Donation = require('../models/Donation');
const Project = require('../models/Project');

const processPayment = async (paymentMethod, amount) => {
  let paymentResult;
  if (paymentMethod === 'paypal') {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount.toString()
        }
      }]
    });
    paymentResult = await paypalClient.execute(request);
  } else if (paymentMethod === 'razorpay') {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `donation_${Date.now()}`
    };
    paymentResult = await razorpayClient.orders.create(options);
  } else {
    throw new Error('Invalid payment method');
  }
  return paymentResult;
};

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
  processPayment,
  createDonation
};
