// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true }, // Ensure this field exists
//   name: { type: String, required: true },
//   number: { type: String, required: true },
// });
// module.exports = mongoose.model('User', userSchema);

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Unique ID for each user
  name: { type: String, required: true }, // Customer name
  number: { type: String, required: true }, // Customer phone number
  email: { type: String, required: true }, // Customer email ID
  city: { type: String, required: true }, // City
  referenceBy: { type: String, required: true }, // Referred by
  referenceContact: { type: String, required: true }, // Reference contact number
  gstNo: { type: String, required: true } // GST number
});

module.exports = mongoose.model('User', userSchema);
