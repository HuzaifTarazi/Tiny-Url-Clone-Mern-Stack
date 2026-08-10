import dotenv from "dotenv";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const urlRoutes = require("./routes/urls");
const Url = require("./models/Url");

const app = express();
const PORT = import.meta.env.VITE_PORT || 5000;
const BASE_URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/urls", urlRoutes);

app.get("/:shortCode", async (req, res) => {
  try {
    const urlDoc = await Url.findOne({ shortCode: req.params.shortCode });

    if (!urlDoc) {
      return res.status(404).send("Short link not found");
    }

    urlDoc.clicks += 1;
    await urlDoc.save();

    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tinyurl")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on ${BASE_URL}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
