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

//---------- read a json file then seed the data into the data base -------------------
// const jsonData = fs.readFileSync("./data/products.json", "utf-8");
// const productsData = JSON.parse(jsonData);
//console.log(productsData);

async function createProducts(productData) {
  try {
    const products = new Products(productData);
    await products.save();
    // await Products.create(productData);
    //------------ if the data is an array then loop through it and then save it --------------------
    // productData.forEach((item) => {
    //   const products = new Products.data.products(item);
    //   products.save();
    // });
  } catch (error) {
    throw error;
  }
}
//createProducts(productsData);

// to find all the movies

const getAllProducts = async () => {
  try {
    const products = await Products.find({});
    return products;
  } catch (error) {
    throw error;
  }
};
app.get("/api/products", async (req, res) => {
  try {
    const productss = await getAllProducts();
    if (productss.length != 0) {
      res.json({ productss });
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

//---------------------------------- how to add a single object data into database -------------------------------------------

async function insertProduct(productData) {
  try {
    const product = new Products(productData);
    const updatedProduct = product.save();
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
app.post("/api/products", async (req, res) => {
  try {
    const product = await insertProduct(req.body);
    res.status(200).json({ message: "product added successfully, ", product });
  } catch (error) {
    res.status(500).json({ error: "Failed to update data ", error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running");
});
