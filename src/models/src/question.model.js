const mongooseHidden = require('mongoose-hidden')();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true,
    enum: ['writeAnswer', 'multipleChoice', 'trueFalse']
  },

  answer: {
    type: String,
    required: true
  },

  variants: [
    {
      type: String
    }
  ]
});

QuestionSchema.plugin(mongooseHidden, { hidden: { _id: true } });

module.exports = mongoose.model('Question', QuestionSchema);
