const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "GET AUTH" });
});

module.exports = router;
