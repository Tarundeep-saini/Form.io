const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categories: [String],
  items: [
    {
      name: String,
      cat: String,
    },
  ],
  type: String,
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
