const { request: Request, response: Response } = require('express');
const { QuizModel, SubjectModel, QuestionModel } = require('../../models');

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getQuizesBySubject = (req, res) => {
  const { subject } = req.params;

  QuizModel.find(null)
    .populate('subject')
    .then(quizes => {
      if (!quizes || !quizes.length) {
        return res.status(200).json({ status: false, message: `Quizes for subject ${subject} not found` });
      }

      quizes = quizes.filter(el => el.subject.name === subject);
      res.status(200).json({ status: true, quizes });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getExactQuiz = (req, res) => {
  const { subject, quizNumber } = req.params;

  QuizModel.find(null)
    .populate('subject questions', '-_id')
    .then(quiz => {
      if (!quiz) {
        return res.status(200).json({
          status: false,
          message: `Quiz for subject ${subject} with quiz number ${quizNumber} not found`
        });
      }

      quiz = quiz.find(el => el.subject.name === subject && el.quizNumber == quizNumber);
      res.status(200).json({ status: true, quiz });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getAnswersFromExactQuiz = (req, res) => {
  const { subject, quizNumber } = req.params;

  QuizModel.find(null)
    .populate('subject')
    .then(quiz => {
      if (!quiz) {
        return res.status(200).json({
          status: false,
          message: `Quiz for subject ${subject} with quiz number ${quizNumber} not found`
        });
      }

      quiz = quiz.find(el => el.subject.name === subject && el.quizNumber == quizNumber);
      const answers = quiz.questions.map(question => question.answer);
      res.status(200).json({ status: true, answers });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.create = (req, res) => {
  const { subject, date, questions, time } = req.body;

  SubjectModel.findOne({ name: subject })
    .then(subjectData => {
      if (subjectData) {
        const questionsArray = questions.map(question => new QuestionModel(question));
        const quiz = new QuizModel({ subject: subjectData, date, questions: questionsArray, time });

        quiz
          .save()
          .then(quizData => res.status(200).json({ status: true, quiz: quizData }))
          .catch(err => res.status(200).json({ status: false, message: err }));
      } else {
        res.status(200).json({ status: false, message: `Subject with name ${subject} not found` });
      }
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.removeExactQuiz = (req, res) => {
  const { subject, quizNumber } = req.params;

  SubjectModel.findOne({ name: subject })
    .then(subjectData => {
      if (subjectData) {
        QuizModel.findOneAndDelete({ quizNumber })
          .populate('subject')
          .then(quiz => {
            if (quiz) res.status(200).json({ status: true, quiz });
            else res.status(200).json({ status: false, message: 'Quiz to delete not found' });
          })
          .catch(err => res.status(200).json({ status: false, message: err }));
      } else {
        res.status(200).json({ status: false, message: `Subject with name ${subject} not found` });
      }
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};
