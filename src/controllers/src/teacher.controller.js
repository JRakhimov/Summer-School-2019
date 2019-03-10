const { request: Request, response: Response } = require('express');
const { TeacherModel } = require('../../models');

const RESPONSE = 'fullName subject teacherID password';

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getSingle = (req, res) => {
  const { teacherID } = req.params;

  TeacherModel.findOne({ teacherID }, RESPONSE)
    .then(teacher => res.status(200).json({ status: true, teacher }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

exports.getAll = (req, res) => {
  TeacherModel.find(null, RESPONSE)
    .then(teachers => res.status(200).json({ status: true, teachers }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.create = (req, res) => {
  const { fullName, subject, teacherID, password } = req.body;
  const teacher = new TeacherModel({ fullName, subject, teacherID, password });

  teacher
    .save()
    .then(teacherData => res.status(200).json({ status: true, teacher: teacherData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.remove = (req, res) => {
  const { teacherID } = req.params;

  TeacherModel.findOneAndDelete({ teacherID })
    .then(teacher => {
      if (teacher) res.status(200).json({ status: true, teacher });
      else res.status(200).json({ status: false, message: 'Teacher to delete not found' });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};
