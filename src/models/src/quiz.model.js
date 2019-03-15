const mongooseHidden = require('mongoose-hidden')();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },

  quizNumber: {
    type: Number,
    index: { unique: true }
  },

  date: {
    type: Date,
    default: Date.now
  },

  time: {
    type: Number,
    required: true
  },

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    }
  ]
});

QuizSchema.plugin(mongooseHidden, { hidden: { _id: true } });

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 }
});

const counter = mongoose.model('QuizCounter', CounterSchema);

QuizSchema.pre('save', function(next) {
  counter
    .findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, { new: true, upsert: true })
    .then(count => {
      this.quizNumber = count.seq;
      next();
    })
    .catch(error => {
      throw error;
    });
});

module.exports = mongoose.model('Quiz', QuizSchema);
