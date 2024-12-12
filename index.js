const mongoose = require("mongoose");
const { initializeDB } = require("./db/db.connect");
const Products = require("./models/product.model");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
initializeDB();

// const jsonData = fs.readFileSync("products.json", "utf-8");

// const productsData = JSON.parse(jsonData);

async function createProducts(productData) {
  try {
    // const products = new Products(productData);
    // await products.save();
    productData.forEach((item) => {
      const products = new Products(item);
      products.save();
    });
  } catch (error) {
    throw error;
  }
}
//createProducts(productsData);

// to find all the movies

const getAllProducts = async () => {
  try {
    const products = await Products.find();
    return products;
  } catch (error) {
    throw error;
  }
};
app.get("/api/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running");
});
