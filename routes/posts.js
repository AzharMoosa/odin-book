const express = require("express");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

// Get One Post
router.get("/:id", async (req, res) => {
  try {
    // Find Posts
    let post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Posts GET
router.get("/", auth, async (req, res) => {
  try {
    // Find Posts
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

    const user = await User.findById(req.user.id);
    const author = user.name;

    try {
      // Create Post
      const newPost = new Post({
        content,
        user: req.user.id,
        author: author,
      });
      const post = await newPost.save();

      // res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Post PUT
router.put("/:id", auth, async (req, res) => {
  const { content, likes, text, user } = req.body;
  const updatedPost = {};

  const comment = {
    text,
    user,
    date: new Date(),
  };

  try {
    let post = await Post.findById(req.params.id);

    // Check If Post Exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check If Post Belongs To User
    if (post.user.toString() === req.user.id) {
      if (content) updatedPost.content = content;
    }

    if (text && user) updatedPost.comments = [comment, ...post.comments];
    if (likes) updatedPost.likes = likes;

    // Update Post
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedPost },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Post DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    // Check If Post Exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check If Post Belongs To User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Delete Post
    await Post.findByIdAndRemove(req.params.id);

    res.json({ msg: "Post Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
