const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

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
  (req, res) => {
    // Error In Fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;