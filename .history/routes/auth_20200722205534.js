const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Authentication GET
router.get("/", (req, res) => {
  res.json({ msg: "GET AUTH" });
});

// Authentication POST
router.post("/", (req, res) => {
  res.json({ msg: "GET AUTH" });
});

module.exports = router;
