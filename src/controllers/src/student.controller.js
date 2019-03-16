const { request: Request, response: Response } = require('express');
const { StudentModel } = require('../../models');

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

// /**
//  * @param {Request} req - Request class from express
//  * @param {Response} res - Response class from express
//  */
// exports.update = (req, res) => {
//   const { studentID } = req.params;

//   if (req.body.subjects) {
//     SubjectModel.find({ name: { $in: req.body.subjects } })
//       .then(subjectData => {
//         if (subjectData) {
//           req.body.subjects = subjectData;

//           TeacherModel.findOneAndUpdate({ studentID }, req.body, { new: true, upsert: true })
//             .populate('subjects')
//             .then(teacherData => {
//               if (teacherData) res.status(200).json({ status: true, teacher: teacherData });
//               else res.status(200).json({ status: false, message: 'Teacher to delete not found' });
//             })
//             .catch(err => res.status(200).json({ status: false, message: err }));
//         } else {
//           res.status(200).json({ status: false, message: `Subject with name ${subject} not found` });
//         }
//       })
//       .catch(err => res.status(200).json({ status: false, message: err }));
//   } else {
//     TeacherModel.findOneAndUpdate({ teacherID }, req.body, { new: true })
//       .populate('subjects')
//       .then(teacherData => {
//         if (teacherData) res.status(200).json({ status: true, teacher: teacherData });
//         else res.status(200).json({ status: false, message: 'Teacher to update not found' });
//       })
//       .catch(err => res.status(200).json({ status: false, message: err }));
//   }
// };

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
