const mongoose = require("mongoose");

const ClozeSchema = new mongoose.Schema({
  preview: String,
  text: String,
  type: String,
  words: [String],
});

const Cloze = mongoose.model("Cloze", ClozeSchema);

module.exports = Cloze;
