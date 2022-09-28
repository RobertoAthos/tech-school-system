const mongoose = require("mongoose");

const eventListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "É obrigatório um título para tarefa"],
    maxlength: [20, "título deve conter menos de 20 caractéres"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Descrição é obrigatória"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Events", eventListSchema);