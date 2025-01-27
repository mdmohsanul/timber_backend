const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "products.productId"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product to cart
router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// remove product from cart

router.delete("/user/:userId/products/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    //  Find the user and remove the specific product
    const result = await Cart.findOneAndUpdate(
      { userId: userId },
      {
        $pull: {
          products: { productId: productId },
        },
      }, // Match the nested productId
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "User or product not found" });
    }

    res
      .status(200)
      .json({ message: "Product removed successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;
