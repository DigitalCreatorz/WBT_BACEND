const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Ensure this field exists
  name: { type: String, required: true },
  number: { type: String, required: true },
});



module.exports = mongoose.model('User', userSchema);
