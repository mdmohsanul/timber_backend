const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
require("dotenv").config();
const Razorpay = require("razorpay");

// get all orders

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate("products.productId")
      .sort({ createdAt: -1 });
    // if (orders.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No orders found for this user.", orders });
    // }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product to order list
router.post("/", async (req, res) => {
  try {
    const { userId, products, paymentId, orderId } = req.body;
    let order = await Order.findOne({ userId });
    console.log(products);
    // validate request
    if (!userId || !products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "User ID and products are required" });
    }
    // calculate total amount
    const totalPrice = products
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      paymentId,
      orderId,
    });
    const savedOrder = await newOrder.save();

    // res.status(201).json({ message: "Order created successfully", savedOrder });
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create order route

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET_KEY,
});
const MAX_RAZORPAY_AMOUNT = 100000000;

router.post("/create-order", async (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount || isNaN(amount)) {
    return res
      .status(400)
      .json({ error: "Amount is required and must be a number" });
  }

  const amountInPaise = amount * 100;
  console.log(typeof amountInPaise, amountInPaise);
  if (amountInPaise > MAX_RAZORPAY_AMOUNT) {
    return res
      .status(400)
      .json({ error: "Amount exceeds Razorpay limit (₹10,00,000)." });
  }
  try {
    const orderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpayInstance.orders.create(orderOptions);

    res.status(200).json({ orderId: order.id }); // or just order.id
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({
      error: "Error creating Razorpay order",
      details: error.message,
      raw: error,
    });
  }
});

module.exports = router;
