// controllers/surveyController.js
const Survey = require('../models/survey');

const createSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const survey = new Survey({ title, questions });
    await survey.save();
    res.status(201).json({ message: 'Survey created successfully', survey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json({ surveys });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createSurvey, getAllSurveys };

