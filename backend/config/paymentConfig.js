// PayPal Configuration
const paypal = require('@paypal/checkout-server-sdk');

// Creating PayPal environment
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let paypalClient = new paypal.core.PayPalHttpClient(environment);

/* Razorpay Configuration - Commented for future use
const Razorpay = require('razorpay');
const razorpayClient = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
*/

module.exports = {
  paypalClient,
  // razorpayClient, // Uncomment when implementing Razorpay
};
