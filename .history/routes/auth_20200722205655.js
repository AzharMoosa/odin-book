const express = require("express");
const bcrypt = require("bcryptjs");
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
    body("password"),
    "Password is required",
  ],
  (req, res) => {}
);

module.exports = router;
