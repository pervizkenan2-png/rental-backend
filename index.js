require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const Tenant = require("./modelsTenant");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const repairRoutes = require("./routes/repairRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/repairs", repairRoutes);

app.get("/", (req, res) => {
  res.json({ status: "OK", app: "Landlord Lite Backend" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB verbunden"))
  .catch((err) => console.error("MongoDB Fehler:", err.message));

// GET alle Tenants vom eingeloggten User
app.get("/api/tenants", auth, async (req, res) => {
  try {
    const tenants = await Tenant.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ein Tenant
app.get("/api/tenants/:id", auth, async (req, res) => {
  try {
    const tenant = await Tenant.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!tenant) {
      return res.status(404).json({ error: "Mieter nicht gefunden" });
    }

    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE Tenant
app.post("/api/tenants", auth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Nicht autorisiert" });
    }

    const tenant = new Tenant({
      ...req.body,
      userId: req.user.id
    });

    await tenant.save();
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// UPDATE Tenant
app.patch("/api/tenants/:id", auth, async (req, res) => {
  try {
    const updated = await Tenant.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Mieter nicht gefunden" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Tenant
app.delete("/api/tenants/:id", auth, async (req, res) => {
  try {
    const deleted = await Tenant.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ error: "Mieter nicht gefunden" });
    }

    res.json({ message: "Mieter gelöscht" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend läuft auf Port ${PORT}`);
});