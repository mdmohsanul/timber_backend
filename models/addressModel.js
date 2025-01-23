const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNum: {
    type: Number,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
