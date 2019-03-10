const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// @ts-ignore
AdminSchema.pre('save', function(next) {
  // @ts-ignore
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);
