const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
