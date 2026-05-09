const mongoose = require("mongoose");

const rentIncreaseSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true
    },

    tenantName: {
      type: String,
      required: true
    },

    unit: {
      type: String,
      default: ""
    },

    oldRent: {
      type: Number,
      required: true
    },

    newRent: {
      type: Number,
      required: true
    },

    difference: {
      type: Number,
      required: true
    },

    percent: {
      type: Number,
      required: true
    },

    effectiveDate: {
      type: String,
      default: ""
    },

    reason: {
      type: String,
      default: ""
    },

    customReason: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RentIncrease", rentIncreaseSchema);