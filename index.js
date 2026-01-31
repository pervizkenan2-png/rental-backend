// ================================
// Landlord Lite – Backend
// index.js
// ================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ================================
// CONFIG
// ================================
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ================================
// MIDDLEWARE
// ================================
app.use(cors());
app.use(express.json());

// ================================
// MONGODB CONNECT
// ================================
if (!MONGO_URI) {
  console.error("❌ MONGO_URI fehlt (Environment Variable)");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => {
    console.error("❌ MongoDB Fehler:", err.message);
    process.exit(1);
  });

// ================================
// SCHEMA & MODEL
// ================================
const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, required: true },
    rent: { type: Number, required: true },
    dueDay: { type: Number, required: true },
    iban: { type: String },
    status: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
  },
  { timestamps: true }
);

const Tenant = mongoose.model('Tenant', tenantSchema);

// ================================
// ROUTES
// ================================

// Health Check (WICHTIG für Render)
app.get('/', (req, res) => {
  res.json({ status: 'OK', app: 'Landlord Lite Backend' });
});

// Get all tenants
app.get('/api/tenants', async (req, res) => {
  try {
    const tenants = await Tenant.find().sort({ createdAt: -1 });
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single tenant
app.get('/api/tenants/:id', async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ error: 'Mieter nicht gefunden' });
    }
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create tenant
app.post('/api/tenants', async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    await tenant.save();
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update tenant
app.patch('/api/tenants/:id', async (req, res) => {
  try {
    const updated = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Mieter nicht gefunden' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete tenant
app.delete('/api/tenants/:id', async (req, res) => {
  try {
    const deleted = await Tenant.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Mieter nicht gefunden' });
    }
    res.json({ message: 'Mieter gelöscht' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================
// SERVER START
// ================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend läuft auf Port ${PORT}`);
});