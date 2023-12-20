const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  ],
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
