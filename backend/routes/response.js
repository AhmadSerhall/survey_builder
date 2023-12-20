const express = require('express');
const router = express.Router();
const responseController = require('../controller/response');
const authMiddleware = require('../middlewares/auth');

router.post('/:surveyId', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const surveyId = req.params.surveyId;
  const answers = req.body.answers; // Adjust this based on how your frontend sends the data
  try {
    const response = await responseController.saveResponse(userId, surveyId, answers);
    res.status(200).json({ message: 'Survey response saved successfully', response });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/responses/:surveyId', authMiddleware, async (req, res) => {
  const surveyId = req.params.surveyId;
  try {
    const responses = await responseController.getResponsesForSurvey(surveyId);
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
