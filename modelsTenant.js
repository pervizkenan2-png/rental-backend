const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  dueDay: {
    type: Number,
    required: true
  },
  iban: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tenant", tenantSchema);
