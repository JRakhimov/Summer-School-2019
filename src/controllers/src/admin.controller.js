const { request: Request, response: Response } = require('express');
const { AdminModel } = require('../../models');

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getAll = (req, res) => {
  AdminModel.find(null)
    .then(adminsData => res.status(200).json({ status: true, admins: adminsData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.create = (req, res) => {
  const { login, password } = req.body;
  const admin = new AdminModel({ login, password });

  admin
    .save()
    .then(adminData => res.status(200).json({ status: true, admin: adminData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.remove = (req, res) => {
  const { login } = req.params;

  AdminModel.findOneAndDelete({ login })
    .then(adminData => {
      if (adminData) res.status(200).json({ status: true, admin: adminData });
      else res.status(200).json({ status: false, message: 'Admin to delete not found' });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};
