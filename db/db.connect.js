const mongoose = require("mongoose");
require("dotenv").config();

const mongo_uri = process.env.MONGODB_URI;

const initializeDB = async () => {
  try {
    const connection = await mongoose.connect(mongo_uri);
    if (connection) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.log("Error connecting to database ", error);
  }
};

module.exports = { initializeDB };
