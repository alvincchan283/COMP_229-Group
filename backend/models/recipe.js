const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ingredients: { type: String, required: true },
  tips: { type: String, required: true },
  cuisine: { type: String },
  prepareTime: { type: Number, default: 10 },
  author: { type: mongoose.Schema.Types.ObjectId },
  yield: { type: Number, default: 2 },
});

module.exports = mongoose.model("Recipe", recipeSchema);
