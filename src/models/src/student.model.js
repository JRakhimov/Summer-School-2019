const mongooseHidden = require('mongoose-hidden')();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  studentID: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 8,
    maxlength: 8,
    index: { unique: true }
  },

  fullName: {
    type: String,
    required: true,
    trim: true
  },

  quizes: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      },

      quizNumber: {
        type: Number,
        index: { unique: true },
        required: true
      },

      answers: [
        {
          type: String,
          required: true
        }
      ]
    }
  ]
});

StudentSchema.plugin(mongooseHidden, { hidden: { _id: true } });

module.exports = mongoose.model('Student', StudentSchema);
