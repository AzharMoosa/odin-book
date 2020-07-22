const express = require("express");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

// Posts GET
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Posts POST
router.post("/", (req, res) => {
  res.json({ msg: "GET Posts" });
});

// Post PUT
router.put("/", (req, res) => {
  res.json({ msg: "GET Posts" });
});

// Post DELETE
router.delete("/", (req, res) => {
  res.json({ msg: "GET Posts" });
});

module.exports = router;
