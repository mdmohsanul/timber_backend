const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// get all orders

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const cart = await Order.findOne({ userId }).populate("products.productId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product to order list
router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let order = await Order.findOne({ userId });

    if (!order) {
      order = new Order({ userId, products: [{ productId, quantity }] });
    } else {
      const productIndex = order.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) {
        order.products[productIndex].quantity += quantity;
      } else {
        order.products.push({ productId, quantity });
      }
    }

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
