const mongoose = require('mongoose');

// Check if the model is already compiled to avoid OverwriteModelError
const City = mongoose.models.City || mongoose.model('City', new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
}));

module.exports = City;
