const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
  login: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 4,
    index: { unique: true }
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
