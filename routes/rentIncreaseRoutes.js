```js id="6m2kxp"
const express = require("express");
const router = express.Router();

const RentIncrease = require("../models/modelsRentIncrease");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {

    const rentIncrease = new RentIncrease({
      ...req.body
    });

    await rentIncrease.save();

    res.status(201).json(rentIncrease);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Fehler beim Speichern der Historie"
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {

    const history = await RentIncrease
      .find()
      .sort({ createdAt: -1 });

    res.json(history);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Fehler beim Laden der Historie"
    });
  }
});

module.exports = router;
```
