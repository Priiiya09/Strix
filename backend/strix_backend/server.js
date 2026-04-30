require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ─── MIDDLEWARE ──────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "10mb" }));   // 10mb for base64 images
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// serve frontend files from parent folder (index.html, admin.html)
app.use(express.static(path.join(__dirname)));

// ─── ROUTES ──────────────────────────────────────────────────
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

// ─── DB CONNECT ───────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/strixCMS";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected:", MONGO_URI))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ─── START ────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   Website:  http://localhost:${PORT}/index.html`);
  console.log(`   Admin CMS: http://localhost:${PORT}/admin.html`);
});
