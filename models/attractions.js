const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  title: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  photoPath: { type: String },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date }
});

module.exports = mongoose.model('Attraction', attractionSchema);