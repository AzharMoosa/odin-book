const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("comment", CommentSchema);
