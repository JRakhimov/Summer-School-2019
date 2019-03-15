const subjectRouter = require('express').Router();
const { SubjectController } = require('../../controllers');

subjectRouter.post('/create', SubjectController.create);
subjectRouter.delete('/:id', SubjectController.remove);
subjectRouter.get('/:id', SubjectController.getSingle);
subjectRouter.put('/:id', SubjectController.update);
subjectRouter.get('/', SubjectController.getAll);

module.exports = subjectRouter;
