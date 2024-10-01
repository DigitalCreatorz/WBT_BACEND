// // // models/FlightCarrier.js
// // const mongoose = require('mongoose');

// // const flightCarrierSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// // });

// // module.exports = mongoose.model('FlightCarrier', flightCarrierSchema);

// // models/FlightCarrier.js
// const mongoose = require('mongoose');

// const flightCarrierSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   code: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('FlightCarrier', flightCarrierSchema);















// models/FlightCarrier.js
const mongoose = require('mongoose');

const flightCarrierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('FlightCarrier', flightCarrierSchema);