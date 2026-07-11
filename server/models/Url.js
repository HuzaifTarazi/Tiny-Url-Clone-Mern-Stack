const mongoose = require("mongoose");

// One document = one shortened link
const urlSchema = new mongoose.Schema(
  {
    // The long link the user pasted (e.g. https://google.com)
    originalUrl: {
      type: String,
      required: true,
    },

    // Short code used in the link (e.g. "aB3x9K")
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    // How many times someone opened the short link
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    // Adds createdAt and updatedAt automatically
    timestamps: true,
  }
);

module.exports = mongoose.model("Url", urlSchema);
