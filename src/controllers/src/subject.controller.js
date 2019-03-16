const { request: Request, response: Response } = require('express');
const { SubjectModel } = require('../../models');

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getSingle = (req, res) => {
  const { id } = req.params;

  SubjectModel.findOne({ id }, '-_id')
    .then(subjectData => res.status(200).json({ status: true, subject: subjectData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getAll = (req, res) => {
  SubjectModel.find(null, '-_id')
    .then(subjectData => res.status(200).json({ status: true, subjects: subjectData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.create = (req, res) => {
  const { name } = req.body;
  const subject = new SubjectModel({ name });

  subject
    .save()
    .then(subjectData =>
      res.status(200).json({
        status: true,
        subject: subjectData
      })
    )
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  SubjectModel.findOneAndUpdate({ id }, { name }, { new: true })
    .then(subjectData => {
      if (subjectData) res.status(200).json({ status: true, subject: subjectData });
      else res.status(200).json({ status: false, message: 'Subject to update not found' });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.remove = (req, res) => {
  const { id } = req.params;

  SubjectModel.findOneAndDelete({ id })
    .then(subjectData => {
      if (subjectData) res.status(200).json({ status: true, subject: subjectData });
      else res.status(200).json({ status: false, message: 'Subject to delete not found' });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};
