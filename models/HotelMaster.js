const mongoose = require('mongoose');
const hotelMasterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('HotelMaster', hotelMasterSchema);