const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/", (req, res) => {
  res.json(req.body);
});

module.exports = router;
