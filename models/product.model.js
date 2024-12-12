const mongoose = require("mongoose");

const TimberProductSchema = new mongoose.Schema({
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

const Timber_Products = mongoose.model("Timber_Products", TimberProductSchema);
module.exports = Timber_Products;
