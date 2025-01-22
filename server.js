const express = require("express");
const dotenv = require("dotenv");
const { initializeDB } = require("./config/db.connect");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
dotenv.config();

// connecting DB
initializeDB();

// CORS Policy
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Import Routes
app.use("/api/products", productRoutes);
app.use("/api", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
