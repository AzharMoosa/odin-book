const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// Post To /api/users
router.post(
  "/",
  [
    body("name"),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  (req, res) => {}
);

module.exports = router;
