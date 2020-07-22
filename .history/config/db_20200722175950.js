const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose.connect();
};
