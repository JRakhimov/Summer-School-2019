const adminRouter = require('express').Router();
const { AdminController } = require('../../controllers');

adminRouter.get('/', AdminController.getAll);
adminRouter.post('/create', AdminController.create);
adminRouter.delete('/:login', AdminController.remove);

module.exports = adminRouter;
