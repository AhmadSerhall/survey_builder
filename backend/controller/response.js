const Response = require('../models/response');

const saveResponse = async (userId, surveyId, answers) => {
  try {
    const response = new Response({
      user: userId,
      survey: surveyId,
      answers,
    });
    await response.save();
    return response;
  } catch (error) {
    throw error;
  }
};

const getResponsesForSurvey = async (surveyId) => {
  try {
    const responses = await Response.find({ survey: surveyId }).populate('user', 'username'); // Populate user details
    return responses;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveResponse,
  getResponsesForSurvey,
};
