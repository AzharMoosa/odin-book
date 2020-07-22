const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log("MongoDB Connected"));
};
