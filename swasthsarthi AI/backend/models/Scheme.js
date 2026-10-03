const mongoose = require("mongoose");

const schemesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    eligibility: {
      type: [String],
      default: [],
    },

    documents: {
      type: [String],
      default: [],
    },

    steps: {
      type: [String],
      default: [],
    },

    officialSource: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schemesSchema.index(
  {
    name: "text",
    category: "text",
    purpose: "text",
    description: "text",
  },
  {
    weights: {
      name: 10,
      category: 7,
      purpose: 5,
      description: 2,
    },
    name: "scheme_text_search",
  }
);

module.exports = mongoose.model("Scheme", schemesSchema);