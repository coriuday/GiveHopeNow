const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Project = require("../models/Project");
const User = require("../models/User");
const Donation = require("../models/Donation");
const crypto = require("crypto");

// PayPal SDK setup
const paypal = require("@paypal/checkout-server-sdk");
let environment;
if (process.env.NODE_ENV === "production") {
  environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
} else {
  environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
}
const paypalClient = new paypal.core.PayPalHttpClient(environment);

// RazorPay setup
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @route   POST /api/payments/paypal/create-order
// @desc    Create a PayPal order
// @access  Private
router.post("/paypal/create-order", auth, async (req, res) => {
  try {
    const { projectId, amount, rewardId } = req.body;

    // Validate input
    if (!projectId || !amount) {
      return res.status(400).json({ message: "Project ID and amount are required" });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if project is active
    if (project.status !== "active") {
      return res.status(400).json({ message: "Project is not active" });
    }

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString(),
          },
          description: `Donation to ${project.title}`,
          custom_id: `${projectId}${rewardId ? `:${rewardId}` : ""}`,
        },
      ],
      application_context: {
        brand_name: "GiveHopeNow",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    });

    const order = await paypalClient.execute(request);
    
    res.json({
      id: order.result.id,
      status: order.result.status,
    });
  } catch (error) {
    console.error("PayPal create order error:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/payments/paypal/capture-order
// @desc    Capture a PayPal order after approval
// @access  Private
router.post("/paypal/capture-order", auth, async (req, res) => {
  try {
    const { orderId, projectId, amount, rewardId } = req.body;

    // Validate input
    if (!orderId || !projectId || !amount) {
      return res.status(400).json({ message: "Order ID, project ID, and amount are required" });
    }

    // Capture the PayPal order
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await paypalClient.execute(request);

    if (capture.result.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Process the donation
    await processSuccessfulDonation(
      req.user.userId,
      projectId,
      amount,
      rewardId,
      orderId,
      "paypal"
    );

    res.json({
      status: "success",
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error("PayPal capture order error:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/payments/razorpay/create-order
// @desc    Create a Razorpay order
// @access  Private
router.post("/razorpay/create-order", auth, async (req, res) => {
  try {
    const { projectId, amount, rewardId } = req.body;

    // Validate input
    if (!projectId || !amount) {
      return res.status(400).json({ message: "Project ID and amount are required" });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if project is active
    if (project.status !== "active") {
      return res.status(400).json({ message: "Project is not active" });
    }

    // Create Razorpay order (amount in paise - multiply by 100)
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `donation_${projectId}_${Date.now()}`,
      notes: {
        projectId,
        rewardId: rewardId || "",
        userId: req.user.userId,
      },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay create order error:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/payments/razorpay/verify
// @desc    Verify Razorpay payment signature
// @access  Private
router.post("/razorpay/verify", auth, async (req, res) => {
  try {
    const { orderId, paymentId, signature, projectId, amount, rewardId } = req.body;

    // Validate input
    if (!orderId || !paymentId || !signature || !projectId || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Process the donation
    await processSuccessfulDonation(
      req.user.userId,
      projectId,
      amount,
      rewardId,
      paymentId,
      "razorpay"
    );

    res.json({
      status: "success",
      message: "Payment verified and processed successfully",
    });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Helper function to process successful donations
async function processSuccessfulDonation(userId, projectId, amount, rewardId, paymentId, paymentMethod) {
  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update project
    const project = await Project.findById(projectId).session(session);
    if (!project) {
      throw new Error("Project not found");
    }

    // Update project amount and backers
    project.currentAmount += Number(amount);
    project.backers += 1;
    
    // If project is now fully funded, update status if needed
    if (project.currentAmount >= project.goalAmount && project.status === "active") {
      project.status = "completed";
    }

    await project.save({ session });

    // Create donation record
    const donation = new Donation({
      project: projectId,
      user: userId,
      amount: Number(amount),
      paymentId,
      paymentMethod,
    });

    await donation.save({ session });

    // Update user's backed projects
    const backingData = {
      project: projectId,
      amount: Number(amount),
    };

    if (rewardId) {
      backingData.reward = rewardId;
    }

    await User.findByIdAndUpdate(
      userId,
      { $push: { backedProjects: backingData } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    throw error;
  } finally {
    // End session
    session.endSession();
  }
}

module.exports = router; 