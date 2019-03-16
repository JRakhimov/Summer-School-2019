const studentSelfRouter = require('express').Router();
const { StudentController } = require('../../controllers');

studentSelfRouter.put('/answer/:subject/:quizNumber', StudentController.answerToQuestions);

module.exports = studentSelfRouter;
