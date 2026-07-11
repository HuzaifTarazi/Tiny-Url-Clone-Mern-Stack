const express = require("express");
const Url = require("../models/Url");
const { createShortCode, isValidUrl } = require("../utils/helpers");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch URLs" });
  }
});

router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "Please enter a URL" });
    }

    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ message: "Please enter a valid URL" });
    }

    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.json(existing);
    }

    const shortCode = createShortCode();
    const newUrl = await Url.create({ originalUrl, shortCode });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: "Could not shorten URL" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: "URL deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete URL" });
  }
});

module.exports = router;
