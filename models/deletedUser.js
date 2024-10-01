const mongoose = require('mongoose');
const deletedUserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    city: {
      type: String
    },
    referenceBy: {
      type: String
    },
    referenceContact: {
      type: String
    },
    gstNo: {
      type: String
    },
    deletedAt: {
      type: Date,
      default: Date.now
    }
  });
  module.exports = mongoose.model('DeletedUser', deletedUserSchema);