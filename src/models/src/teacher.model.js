const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const TeacherSchema = new Schema(
  {
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
  },
  { _id: false }
);

TeacherSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

module.exports = mongoose.model('Teacher', TeacherSchema);
