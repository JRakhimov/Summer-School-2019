const studentRouter = require('express').Router();
const { StudentController } = require('../../controllers');

studentRouter.get('/', StudentController.getAll);
studentRouter.post('/create', StudentController.create);
// studentRouter.put('/:teacherID', StudentController.update);
studentRouter.get('/:studentID', StudentController.getSingle);
studentRouter.delete('/:studentID', StudentController.remove);

module.exports = studentRouter;
