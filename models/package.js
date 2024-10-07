const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  days: { type: Number, required: true },
  cities: [{ type: String, required: true }],
  itinerary: [{
    cities: [{ type: String, required: true }],
    attractions: [{ type: String, required: true }],
  }],
});

module.exports = mongoose.model('Package', PackageSchema);
