const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => {
  res.json({ msg: "GET Users" });
});

module.exports = router;
