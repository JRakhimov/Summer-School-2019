const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizModel = new Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },

  quizNumber: {
    type: Number,
    index: { unique: true }
  },

  date: {
    type: Date,
    default: Date.now()
  },

  quetions: [
    {
      quetion: {
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
    }
  ]
});

const CounterModel = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 }
});

const counter = mongoose.model('QuizCounter', CounterModel);

// @ts-ignore
QuizModel.pre('save', function(next) {
  counter
    .findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, { new: true, upsert: true })
    .then(count => {
      // @ts-ignore
      this.quizNumber = count.seq;
      next();
    })
    .catch(error => {
      throw error;
    });
});

module.exports = mongoose.model('Quiz', QuizModel);
