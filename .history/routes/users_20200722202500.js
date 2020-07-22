const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.post("/", (req, res) => {
  res.json(req.body);
});

module.exports = router;
