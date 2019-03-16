const authRouter = require('express').Router();
const { AuthController } = require('../../controllers');

authRouter.post('/admin', AuthController.adminLogin);
authRouter.post('/teacher', AuthController.teacherLogin);
authRouter.post('/student', AuthController.studentLogin);

module.exports = authRouter;
