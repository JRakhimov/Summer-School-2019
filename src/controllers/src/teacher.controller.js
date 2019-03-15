const { request: Request, response: Response } = require('express');
const { TeacherModel, SubjectModel } = require('../../models');

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getSingle = (req, res) => {
  const { teacherID } = req.params;

  TeacherModel.findOne({ teacherID })
    .populate('subjects')
    .then(teacherData => res.status(200).json({ status: true, teacher: teacherData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.getAll = (req, res) => {
  TeacherModel.find(null)
    .populate('subjects')
    .then(teachersData => res.status(200).json({ status: true, teachers: teachersData }))
    .catch(err => res.status(200).json({ status: false, message: err }));
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.create = (req, res) => {
  const { fullName, subjects, teacherID, password } = req.body;

  SubjectModel.find({ name: { $in: subjects } })
    .then(subjectData => {
      if (subjectData) {
        const teacher = new TeacherModel({ fullName, subjects: subjectData, teacherID, password });

        teacher
          .save()
          .then(teacherData =>
            res.status(200).json({
              status: true,
              teacher: {
                subjects: teacherData.subjects,
                fullName: teacherData.fullName,
                teacherID: teacherData.teacherID
              }
            })
          )
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
exports.update = (req, res) => {
  const { teacherID } = req.params;

  if (req.body.subjects) {
    SubjectModel.find({ name: { $in: req.body.subjects } })
      .then(subjectData => {
        if (subjectData) {
          req.body.subjects = subjectData;

          TeacherModel.findOneAndUpdate({ teacherID }, req.body, { new: true, upsert: true })
            .populate('subjects')
            .then(teacherData => {
              if (teacherData) res.status(200).json({ status: true, teacher: teacherData });
              else res.status(200).json({ status: false, message: 'Teacher to delete not found' });
            })
            .catch(err => res.status(200).json({ status: false, message: err }));
        } else {
          res.status(200).json({ status: false, message: `Subject with name ${subject} not found` });
        }
      })
      .catch(err => res.status(200).json({ status: false, message: err }));
  } else {
    TeacherModel.findOneAndUpdate({ teacherID }, req.body, { new: true })
      .populate('subjects')
      .then(teacherData => {
        if (teacherData) res.status(200).json({ status: true, teacher: teacherData });
        else res.status(200).json({ status: false, message: 'Teacher to update not found' });
      })
      .catch(err => res.status(200).json({ status: false, message: err }));
  }
};

/**
 * @param {Request} req - Request class from express
 * @param {Response} res - Response class from express
 */
exports.remove = (req, res) => {
  const { teacherID } = req.params;

  TeacherModel.findOneAndDelete({ teacherID })
    .populate('subjects')
    .then(teacherData => {
      if (teacherData) res.status(200).json({ status: true, teacher: teacherData });
      else res.status(200).json({ status: false, message: 'Teacher to delete not found' });
    })
    .catch(err => res.status(200).json({ status: false, message: err }));
};
