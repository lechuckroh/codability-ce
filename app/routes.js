'use strict';

const Router = require('koa-router');
const tasksController = require('./tasks/tasks_controller');
const router = new Router();
const packageJson = require('../package.json');

router.get('/', ctx => {
    ctx.body = `${packageJson.name} v${packageJson.version}`;
});

router.get('/tasks/:taskId/status', tasksController.status);
router.get('/tasks/:taskId/:questionIdx', tasksController.query);
router.post('/tasks/:taskId/start', tasksController.start);
router.post('/tasks/:taskId/:questionIdx', tasksController.run);
router.post('/tasks/:taskId/submit', tasksController.submit);


exports.router = router;
