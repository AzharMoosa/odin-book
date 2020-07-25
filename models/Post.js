const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  author: { type: String },
  content: { type: String, required: true },
  comments: { type: Array, default: [] },
  likes: { type: Array, default: [] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", PostSchema);
