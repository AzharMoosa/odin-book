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
router.post(
  "/",
  [auth, [body("content", "Post Content is required").not().isEmpty()]],
  async (req, res) => {
    // Error In Post Content
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Post Content Field Valid
    const { content } = req.body;

    try {
      const newPost = new Post({
        content,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Post PUT
router.put("/:id", (req, res) => {
  res.json({ msg: "GET Posts" });
});

// Post DELETE
router.delete("/:id", auth, (req, res) => {
  res.json({ msg: "GET Posts" });
});

module.exports = router;
