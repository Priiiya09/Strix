const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  n: String,
  label: String,
  desc: String
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  abbr: String,
  title: String,
  thumb: String,
  industry: String,
  desc: String,
  result: String,
  resShort: String,
  resLabel: String,
  tags: [String],
  cats: [String],
  image: { type: String, default: "" },
  services: [String],
  challengeTitle: String,
  challengeText: String,
  approachTitle: String,
  approachText: String,
  results: [ResultSchema]
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
