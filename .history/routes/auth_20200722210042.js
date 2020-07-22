const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Authentication GET
router.get("/", (req, res) => {
  res.json({ msg: "GET AUTH" });
});

// Authentication POST
router.post(
  "/",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // Error In Fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // All Fields Valid
    const { email, password } = req.body;

    try {
      // Check If User Exists
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Compare Passwords with Hashed Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
    } catch (err) {}
  }
);

module.exports = router;
