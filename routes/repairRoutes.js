const express = require("express");
const router = express.Router();
const Repair = require("../models/Repair");

// GET alle Reparaturen
router.get("/", async (req, res) => {
  try {
    const repairs = await Repair.find().sort({ createdAt: -1 });
    res.json(repairs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST neue Reparatur
router.post("/", async (req, res) => {
  try {
    const repair = await Repair.create(req.body);
    res.status(201).json(repair);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH Reparatur bearbeiten
router.patch("/:id", async (req, res) => {
  try {
    const repair = await Repair.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!repair) {
      return res.status(404).json({ error: "Reparatur nicht gefunden" });
    }

    res.json(repair);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Reparatur löschen
router.delete("/:id", async (req, res) => {
  try {
    const repair = await Repair.findByIdAndDelete(req.params.id);

    if (!repair) {
      return res.status(404).json({ error: "Reparatur nicht gefunden" });
    }

    res.json({ message: "Reparatur gelöscht" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;