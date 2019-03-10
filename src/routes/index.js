const router = require('express').Router();

const { teacherAuthCheck } = require('../middlewares');

const teacherRoute = require('./src/teacher.route');
const quizRoute = require('./src/quiz.route');
const authRoute = require('./src/auth.route');

router.get('/', (_req, res) => res.sendStatus(200));

router.use('/auth', authRoute);
router.use('/teacher', teacherRoute);
router.use('/quiz', teacherAuthCheck, quizRoute);

router.all('*', (_req, res) => res.status(404).send({ message: 'Not Found' }));

module.exports = router;
