const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
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
  const { name, email, bio } = req.body;

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

module.exports = router;
