const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;