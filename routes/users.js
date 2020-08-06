const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

// Post To /api/users
router.post(
  "/",
  [
    body("name", "Please enter a name").not().isEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Error In Fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // All Fields Valid
    const { name, email, password } = req.body;

    try {
      // Check if User Exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "Email is already used" });
      }

      // Create New User
      user = new User({
        name,
        email,
        password,
      });

      // Save Image
      let newImg = fs.readFileSync("./uploads/default-user.png");
      var encImg = newImg.toString("base64");
      user.img.data = new Buffer(encImg, "base64");
      user.img.contentType = "images/png";

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save User
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 31600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Update User
router.put("/:id", auth, async (req, res) => {
  const { name, email, bio, friend, request } = req.body;

  const updatedUser = {};

  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email;
  if (bio) updatedUser.bio = bio;

  try {
    let user = await User.findById(req.params.id);

    // Check If User Exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (friend) updatedUser.friends = [friend, ...user.friends];
    if (request) updatedUser.friend_requests = request;

    // Update User
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedUser },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get Users
router.get("/", auth, async (req, res) => {
  try {
    // Find Users
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get Users Post
router.get("/posts", auth, async (req, res) => {
  try {
    // Find Posts
    let user = await User.findById(req.user.id);
    let friendID = [req.user.id];
    let friendPosts = [];
    user.friends.map((friend) => {
      friendID.push(friend._id);
    });

    const getPosts = async () => {
      return Promise.all(
        friendID.map(async (id) => {
          let post = await Post.find({ user: id });
          post.map((p) => {
            friendPosts.push(p);
          });
        })
      );
    };

    getPosts().then(() => {
      friendPosts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      res.json(friendPosts);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get All User Posts
router.get("/posts/:id", auth, async (req, res) => {
  try {
    // Find Posts
    const posts = await Post.find({ user: req.params.id }).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get One User
router.get("/:id", async (req, res) => {
  try {
    // Find User
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Upload Image
router.post("/images", (req, res) => {
  let newItem = new Item();
  newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
  newItem.img.contentType = "image/png";
  newItem.save();
});

module.exports = router;
