// models/Quotation.js
const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  bookingType: {
    type: String,
    required: true
  },
  bookingData: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  vendorName: {  // Add this field
    type: String,
    required: true
  },
  quotations: [{
    vendorRate: Number,
    markupType: {
      type: String,
      enum: ['Price', 'Percentage'],
      default: 'Price'
    },
    markup: Number,
    finalRate: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quotation', QuotationSchema);
