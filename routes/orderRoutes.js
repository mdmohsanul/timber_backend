const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// get all orders

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const orders = await Order.findOne({ userId }).populate(
      "products.productId"
    );
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product to order list
router.post("/", async (req, res) => {
  try {
    const { userId, products } = req.body;
    let order = await Order.findOne({ userId });

    // validate request
    if (!userId || !products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "User ID and products are required" });
    }
    // calculate total amount
    const totalPrice = products.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    const newOrder = new Order({ userId, products, totalPrice });
    const savedOrder = await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
