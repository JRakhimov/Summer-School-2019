const router = require('express').Router();
const teacherRoute = require('./src/teacher.route');

router.get('/', (_req, res) => res.sendStatus(200));

router.use('/teacher', teacherRoute);

router.all('*', (_req, res) => res.status(404).send({ message: 'Not Found' }));

module.exports = router;
