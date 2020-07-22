const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "I'm using Odin Book" },
  friends: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", UserSchema);
