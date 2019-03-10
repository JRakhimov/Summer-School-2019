const { request: Request, response: Response } = require('express');
const { QuizModel } = require('../../models');

const RESPONSE = 'subject quizNumber date quetions';

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getQuizesBySubject = (req, res) => {
  const { subject } = req.params;

  QuizModel.find({ subject }, RESPONSE)
    .then(quiz => res.status(200).json({ status: true, quiz }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getExactQuiz = (req, res) => {
  const { subject, quizNumber } = req.params;

  QuizModel.findOne({ subject, quizNumber }, RESPONSE)
    .then(quiz => res.status(200).json({ status: true, quiz }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.create = (req, res) => {
  const { subject, date, quetions } = req.body;
  const quiz = new QuizModel({ subject, date, quetions });

  quiz
    .save()
    .then(quizData => res.status(200).json({ status: true, quiz: quizData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.removeExactQuiz = (req, res) => {
  const { subject, quizNumber } = req.params;

  QuizModel.findOneAndDelete({ subject, quizNumber })
    .then(quiz => {
      if (quiz) res.status(200).json({ status: true, quiz });
      else res.status(200).json({ status: false, message: 'Quiz to delete not found' });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};
