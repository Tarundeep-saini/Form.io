const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  creator: { type: String, required: true },
  allquestions: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
