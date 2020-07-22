const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// Post To /api/users
router.post("/", (req, res) => {
  res.json(req.body);
});

module.exports = router;
