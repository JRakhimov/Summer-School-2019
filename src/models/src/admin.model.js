const mongooseHidden = require('mongoose-hidden')();
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
    hide: true,
    minlength: 6
  }
});

AdminSchema.plugin(mongooseHidden, { hidden: { _id: true } });

AdminSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);
