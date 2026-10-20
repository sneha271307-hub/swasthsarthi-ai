const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    category: {
      type: String,
      enum: ["medical", "fire", "security", "hazard", "other"],
      required: true
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    urgency: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium"
    },

    status: {
      type: String,
      enum: [
        "reported",
        "assessed",
        "assigned",
        "acknowledged",
        "resolved"
      ],
      default: "reported"
    },

    assignedResponder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Incident", incidentSchema);