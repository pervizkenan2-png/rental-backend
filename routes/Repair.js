const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema(
  {
    tenant: String,
    tenantName: String,
    unit: String,
    status: {
      type: String,
      default: "offen"
    },
    date: String,
    reportedAt: String,
    contractor: String,
    technician: String,
    phone: String,
    cost: {
      type: Number,
      default: 0
    },
    paid: {
      type: String,
      default: "nein"
    },
    problem: String,
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repair", repairSchema);