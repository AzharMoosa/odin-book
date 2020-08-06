const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "I'm using Odin Book" },
  friends: { type: Array, default: [] },
  friend_requests: { type: Array, default: [] },
  date: { type: Date, default: Date.now },
  img: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("user", UserSchema);
