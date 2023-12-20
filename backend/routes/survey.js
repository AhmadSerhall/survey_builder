const express = require('express');
const router = express.Router();
const surveyController = require('../controller/survey');
const { authMiddleware } = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/create', surveyController.createSurvey);
router.get('/all', surveyController.getAllSurveys);

module.exports = router;
