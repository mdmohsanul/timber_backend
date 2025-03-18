const express = require("express");
const router = express.Router();
const Address = require("../models/addressModel");

router.get("/", async (req, res) => {
  try {
    const address = await Address.find({});
    res.status(200).json({
      address,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    mobileNum,
    locality,
    pincode,
    fullAddress,
    city,
    state,
    addressType,
  } = req.body;

  try {
    if (!(name || mobileNum || pincode || fullAddress)) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }
    const address = await Address.create({
      name,
      mobileNum,
      locality,
      pincode,
      fullAddress,
      city,
      state,
      addressType,
    });
    /*
     * Another way to save data
     * const address = new Address({})
     *  await address.save();
     */

    res.status(201).json({ message: "Saved Data Successfully", address });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const addressId = req.params.id;
  try {
    const deleteAddress = await Address.findByIdAndDelete(addressId);
    if (!deleteAddress) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.status(200).json({
      message: "Address deleted successfully",
      address: deleteAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const updatedAddress = req.body;
  const addressId = req.params.id;
  try {
    if (!(addressId && updatedAddress)) {
      return res.status(400).json({ message: "Address not found" });
    }
    const updateAddress = await Address.findByIdAndUpdate(
      addressId,
      updatedAddress,
      { new: true }
    );
    res.status(200).json({ message: "Address Updated", updateAddress });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
