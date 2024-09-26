// const mongoose = require('mongoose');

// const vendorSchema = new mongoose.Schema({
//   companyName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   emails: [{
//     type: String,
//     trim: true
//   }],
//   gstDetails: {
//     type: String,
//     required: true,
//     trim: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Vendor', vendorSchema);






// models/vendor.js
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  emails: [{
    type: String,
    trim: true
  }],
  gstDetails: {
    type: String,
    required: true,
    trim: true
  },
  services: [{
    type: String,
    enum: ['Hotel', 'Flight', 'Visa', 'Insurance', 'Car Rental', 'Cruise'],
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema);
