const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Secret Key
const JWT_SECRET = "supersecretkey";

router.post("/signup", async (req, res) => {
  //get all data
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    // Hash or encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.post("/login", async (req, res) => {
  //get all data
  const { email, password } = req.body;

  try {
    // validation
    if (!(email || password)) {
      return res.status(401).json({ message: "Enter valid email & password" });
    }

    // find user in db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    // match the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    /*
     *  Now we have to send token and user Data to client
     *  So we don't want to send password
     */
    user.password = undefined;
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Protected Route
router.get("/protected", (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Access granted", user: decoded });
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = router;
