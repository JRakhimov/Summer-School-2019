const authRouter = require('express').Router();
const { AuthController } = require('../../controllers');

authRouter.post('/teacher', AuthController.teacherLogin);

module.exports = authRouter;
