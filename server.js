const express = require("express");
const dotenv = require("dotenv");
const { initializeDB } = require("./config/db.connect");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
dotenv.config();

// connecting DB
initializeDB();

// CORS Policy
const cors = require("cors");

const corsOptions = {
  origin: "https://timber-backend.vercel.app/",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware -- bcoz every data that comes is in json Form
app.use(express.json());

// Import Routes
app.use("/api/products", productRoutes);
app.use("/api", userRoutes);
app.use("/address", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order", orderRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
