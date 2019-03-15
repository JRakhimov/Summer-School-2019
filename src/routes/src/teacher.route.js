const teacherRouter = require('express').Router();
const { TeacherController } = require('../../controllers');

teacherRouter.get('/', TeacherController.getAll);
teacherRouter.post('/create', TeacherController.create);
teacherRouter.put('/:teacherID', TeacherController.update);
teacherRouter.get('/:teacherID', TeacherController.getSingle);
teacherRouter.delete('/:teacherID', TeacherController.remove);

module.exports = teacherRouter;
