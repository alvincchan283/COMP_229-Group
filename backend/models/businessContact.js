const mongoose = require("mongoose");

const businessContactSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: Number, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("BusinessContact", businessContactSchema);
