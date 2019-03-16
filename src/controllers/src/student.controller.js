const { request: Request, response: Response } = require('express');
const { StudentModel, QuizModel } = require('../../models');

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getSingle = (req, res) => {
  const { studentID } = req.params;

  StudentModel.findOne({ studentID })
    .then(studentData => res.status(200).json({ status: true, student: studentData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getAll = (req, res) => {
  StudentModel.find(null)
    .then(studentsData => res.status(200).json({ status: true, students: studentsData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.create = (req, res) => {
  const { fullName, studentID } = req.body;

  const student = new StudentModel({ fullName, studentID });

  student
    .save()
    .then(studentData =>
      res.status(200).json({
        status: true,
        student: {
          fullName: studentData.fullName,
          studentID: studentData.studentID
        }
      })
    )
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.remove = (req, res) => {
  const { studentID } = req.params;

  StudentModel.findOneAndDelete({ studentID })
    .then(studentData => {
      if (studentData) res.status(200).json({ status: true, student: studentData });
      else res.status(200).json({ status: false, message: 'Student to delete not found' });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.answerToQuestions = (req, res) => {
  const { subject, quizNumber } = req.params;
  const { answers, studentID } = req.body;

  QuizModel.find(null)
    .populate('subject')
    .then(quizes => quizes.find(quiz => quiz.subject.name === subject && quiz.quizNumber == quizNumber))
    .then(quiz => {
      if (!quiz) {
        return res.status(200).json({
          status: false,
          message: `Quiz for subject ${subject} with quiz number ${quizNumber} not found`
        });
      }

      if (quiz.questions.length !== answers.length) {
        return res.status(200).json({
          status: false,
          message: `Amount of questions in the quiz and amount of your answers is not equal`
        });
      }

      StudentModel.findOne({ studentID })
        .then(studentData => {
          const alreadyAnswered = studentData.quizes.find(quiz => quiz.quizNumber == quizNumber);

          if (alreadyAnswered) {
            return res.status(200).json({
              status: false,
              message: `You already answered to quiz number ${quizNumber}`
            });
          }

          StudentModel.findOneAndUpdate(
            { studentID },
            {
              $push: {
                quizes: {
                  subject: quiz.subject,
                  quizNumber: quiz.quizNumber,
                  answers
                }
              }
            },
            { new: true }
          )
            .populate('quizes.subject', '-_id')
            .then(studentData => {
              if (studentData) res.status(200).json({ status: true, student: studentData });
              else res.status(200).json({ status: false, message: `Student with ID ${studentID} not found` });
            })
            .catch(err => res.status(200).json({ status: false, message: err }));
        })
        .catch(err => res.status(200).json({ status: false, message: err }));
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};
