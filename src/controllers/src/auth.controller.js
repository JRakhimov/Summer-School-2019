const { request: Request, response: Response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { AdminModel, TeacherModel } = require('../../models');

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

        res.status(200).json({ status: true, teacher: adminData, token });
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

        res.status(200).json({ status: true, teacher: teacherData, token });
      } else {
        res.status(200).json({ status: false, message: 'Invalid login or password' });
      }
    })
    .catch(err => res.status(400).json({ status: false, message: err }));
};
