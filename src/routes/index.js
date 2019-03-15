const router = require('express').Router();

const { teacherAuthCheck, adminAuthCheck } = require('../middlewares');

const teacherRoute = require('./src/teacher.route');
const subjectRoute = require('./src/subject.route');
const adminRoute = require('./src/admin.route');
const quizRoute = require('./src/quiz.route');
const authRoute = require('./src/auth.route');

router.get('/', (_req, res) => res.sendStatus(200));

router.use('/auth', authRoute);

router.use('/admin', adminAuthCheck, adminRoute); // To add new admins, u should be admin too!
router.use('/teacher', adminAuthCheck, teacherRoute); // To add/modify teachers, u should be admin!
router.use('/subject', adminAuthCheck, subjectRoute); // To add/modify subjects, u should be admin!

router.use('/quiz', teacherAuthCheck, quizRoute); // To add/modify quizes, u should be teacher!

router.all('*', (_req, res) => res.status(404).send({ message: 'Not Found' }));

module.exports = router;
