const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "I'm using Odin Book" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("comment", CommentSchema);
