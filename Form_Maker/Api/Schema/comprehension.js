const mongoose = require("mongoose");

const comprehensionSchema = new mongoose.Schema({
  passage: String,
  questions: [
    {
      question: String,
      options: [
        {
          text: String,
          isTrue: Boolean,
        },
      ],
    },
  ],
  type: String,
});

const Comprehension = mongoose.model("comprehension", comprehensionSchema);

module.exports = Comprehension;
