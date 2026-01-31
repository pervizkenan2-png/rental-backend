// modelsTenant.js
const mongoose = require('mongoose');

// Schema für Mieter (Tenant)
const tenantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true              // 👤 Name ist Pflicht
  },
  rentAmount: { 
    type: Number, 
    required: true              // 💶 Miete ist Pflicht
  },
  paid: { 
    type: Boolean, 
    default: false               // Standard: noch nicht bezahlt
  },
  createdAt: { 
    type: Date, 
    default: Date.now            // Automatisch das Erstellungsdatum
  }
});

// Modell erstellen
const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
