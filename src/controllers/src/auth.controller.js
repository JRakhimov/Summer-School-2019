const { request: Request, response: Response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { AdminModel, TeacherModel, StudentModel } = require('../../models');
const { authViaEClass } = require('../../utils');

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.adminLogin = (req, res) => {
  const { login, password } = req.body;

  AdminModel.findOne({ login })
    .then(adminData => {
      if (adminData != null && bcrypt.compareSync(password, adminData.password)) {
        const token = jwt.sign({ login }, process.env.SALT, { expiresIn: 86400 });

        res.status(200).json({ status: true, admin: { login }, token });
      } else {
        res.status(200).json({ status: false, message: 'Invalid login or password' });
      }
    })
    .catch(err => res.status(400).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.teacherLogin = (req, res) => {
  const { teacherID, password } = req.body;

  TeacherModel.findOne({ teacherID })
    .then(teacherData => {
      if (teacherData != null && bcrypt.compareSync(password, teacherData.password)) {
        const token = jwt.sign({ teacherID }, process.env.SALT, { expiresIn: 86400 });

        res.status(200).json({
          status: true,
          teacher: {
            fullName: teacherData.fullName,
            teacherID: teacherData.teacherID,
            subject: teacherData.subject
          },
          token
        });
      } else {
        res.status(200).json({ status: false, message: 'Invalid login or password' });
      }
    })
    .catch(err => res.status(400).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.studentLogin = async (req, res) => {
  const { studentID, password } = req.body;

  const eClassAuth = await authViaEClass(studentID, password).catch(err =>
    res.status(400).json({ status: false, message: err })
  );

  if (eClassAuth.status) {
    StudentModel.findOne({ studentID })
      .then(studentData => {
        if (studentData != null) {
          const token = jwt.sign({ studentID }, process.env.SALT, { expiresIn: 86400 });

          res.status(200).json({
            status: true,
            student: {
              studentID: studentData.studentID,
              fullName: eClassAuth.fullName,
              quizes: studentData.quizes
            },
            token
          });
        } else {
          res
            .status(200)
            .json({ status: false, message: `Student with ID ${studentID} not found in our database` });
        }
      })
      .catch(err => res.status(400).json({ status: false, message: err }));
  } else {
    res.status(200).json({ status: false, message: 'Invalid login or password' });
  }
};
