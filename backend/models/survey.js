const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      text: { type: String, required: true },
      type: { type: String, enum: ['radio', 'checkbox', 'input'], required: true },
      choices: [{ type: String }],
    },
  ],
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
