const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlistModel");

// get users wishlist
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    }).populate("products");
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add product to wishlist
router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// remove a product from wishlist

router.delete("/user/:userId/products/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    console.log(userId);
    console.log(productId);

    //Find the user and remove the specific product
    const result = await Wishlist.findOneAndUpdate(
      { userId: userId },
      {
        $pull: { products: productId },
      }, // Match the nested productId
      { new: true } // Return the updated document
    );
    if (!result) {
      return res.status(401).json({ message: "User or product not found" });
    }
    res
      .status(200)
      .json({ message: "Wishlist Product removed successfully", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
