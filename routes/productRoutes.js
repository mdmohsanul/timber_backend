const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// GET /api/products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/products/:productId - Fetch a product by productId
router.get("/products/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findOne({ _id }); // Find product by productId

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//GET /api/products/category

router.get("/categories/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const categories = await Product.find({ category });
    res.status(200).json({
      data: {
        categories,
      },
    });
    console.log(category);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});
module.exports = router;
