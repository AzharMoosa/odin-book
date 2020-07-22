const express = require("express");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

// Posts GET
router.get("/", auth, async (req, res) => {});

// Posts POST
router.post("/", (req, res) => {
  res.json({ msg: "GET Posts" });
});

// Post PUT
router.put("/", (req, res) => {
  res.json({ msg: "GET Posts" });
});

// Post DELETE
router.delete("/", (req, res) => {
  res.json({ msg: "GET Posts" });
});

module.exports = router;
