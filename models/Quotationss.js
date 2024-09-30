const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  adults: {
    type: Number,
    required: true
  },
  children: {
    type: Number,
    required: true
  },
  mealPlan: {
    type: String,
    required: true
  },
  hotelName: {
    type: String,
    required: true
  },
  hotelCategory: {
    type: String,
    required: true
  },
  hotelRate: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quotation', quotationSchema);