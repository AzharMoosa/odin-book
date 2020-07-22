const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

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
    let user = User.findOne({ email });

    res.send(name);

    // try {
    //   // Check if User Exists
    //   let user = User.findOne({ email });

    //   if (user) {
    //     return res.status(400).json({ msg: "Email is already used" });
    //   }

    //   // Create New User
    //   user = new User({
    //     name,
    //     email,
    //     password,
    //   });

    //   // Hash Password
    //   const salt = await bcrypt.genSalt(10);
    //   user.password = await bcrypt.hash(password, salt);

    //   // Save User
    //   await user.save();

    //   res.send("User saved");
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send("Server Error");
    // }
  }
);

module.exports = router;
