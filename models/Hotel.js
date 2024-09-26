const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotelName: { type: String, required: true }, // Changed from hotelNames array to single hotelName string
  city: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  rooms: { type: Number, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, default: 0 },
  childrenAges: [{ age: Number, bed: String }],
  mealPlan: { type: String, enum: ['CP', 'MAP', 'AP', 'AI'], default: 'CP' },
  roomCategory: { type: String },
  occupancy: { type: String, enum: ['Single', 'Double', 'Triple'], default: 'Double' },
  package: { type: String },
  bookingId: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^HB:INQ\d+\/[A-Z]{3}\/[A-Z]{3}\/\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid booking ID format!`
    }
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);