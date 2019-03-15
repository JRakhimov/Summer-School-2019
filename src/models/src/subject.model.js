const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },

  id: {
    type: Number,
    index: { unique: true }
  }
});

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 }
});

const counter = mongoose.model('SubjectCounter', CounterSchema);

SubjectSchema.pre('save', function(next) {
  counter
    .findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, { new: true, upsert: true })
    .then(count => {
      this.id = count.seq;
      next();
    })
    .catch(error => {
      throw error;
    });
});

module.exports = mongoose.model('Subject', SubjectSchema);
