const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single project by _id or id
router.get("/:id", async (req, res) => {
  try {
    let project = await Project.findById(req.params.id).catch(() => null);
    if (!project) project = await Project.findOne({ id: req.params.id });
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update project by _id
router.put("/:id", async (req, res) => {
  try {
    let project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).catch(() => null);

    // fallback: find by custom id field
    if (!project) {
      project = await Project.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
    }

    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE project by _id
router.delete("/:id", async (req, res) => {
  try {
    let project = await Project.findByIdAndDelete(req.params.id).catch(() => null);
    if (!project) project = await Project.findOneAndDelete({ id: req.params.id });
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST seed default projects  (called by admin "Reset Default" button)
router.post("/seed/default", async (req, res) => {
  try {
    const { projects } = req.body;
    if (!projects || !Array.isArray(projects)) {
      return res.status(400).json({ error: "projects array required" });
    }

    // delete all existing and insert defaults
    await Project.deleteMany({});
    const inserted = await Project.insertMany(projects);
    res.json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
