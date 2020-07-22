const express = require("express");
const router = express.Router();

// Posts GET
router.get("/", (req, res) => {
  res.json({ msg: "GET Posts" });
});

// Posts POST
router.post("/", (req, res) => {
  res.json({ msg: "GET Posts" });
});

module.exports = router;
