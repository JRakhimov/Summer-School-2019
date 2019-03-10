const quizRouter = require('express').Router();
const { QuizController } = require('../../controllers');

quizRouter.delete('/:subject/:quizNumber', QuizController.removeExactQuiz);
quizRouter.get('/:subject/:quizNumber', QuizController.getExactQuiz);
quizRouter.get('/:subject', QuizController.getQuizesBySubject);
quizRouter.post('/create', QuizController.create);

module.exports = quizRouter;
