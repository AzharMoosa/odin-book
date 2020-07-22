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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return res.json(req.body);
  }
);

module.exports = router;
