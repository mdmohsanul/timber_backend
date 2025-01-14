const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  discount: { type: Number, required: true },
  timber_assured: { type: Boolean, required: true },
  brand_name: { type: String, required: true },
  image: { type: String, required: true },
  is_in_wishlist: { type: Boolean, default: false },
  is_in_cart: { type: Boolean, default: false },
  productId: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
