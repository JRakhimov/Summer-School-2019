const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  teacherID: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 4,
    index: { unique: true }
  },

  fullName: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  },

  subject: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Teacher', TeacherSchema);
