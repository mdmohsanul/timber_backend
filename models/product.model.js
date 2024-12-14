const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  rating: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  timber_assured: {
    type: Boolean,
  },
  brand_name: {
    type: String,
  },
  image: {
    type: String,
  },
  is_in_wishlist: {
    type: Boolean,
  },
  is_in_cart: {
    type: Boolean,
  },
  productId: {
    type: String,
  },
});

// Define the main data schema with an array of products
const dataSchema = new mongoose.Schema({
  products: { type: [productSchema], required: true }, // Array of products
});
const Products = mongoose.model("Products", dataSchema);
module.exports = Products;
