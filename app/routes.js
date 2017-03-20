'use strict';

const Router = require('koa-router');
const tasksController = require('./run/tasks_controller');
const router = new Router();
const packageJson = require('../package.json');

router.get('/', ctx => {
    ctx.body = `${packageJson.name} v${packageJson.version}`;
});

router.get('/tasks/:taskId/status', tasksController.status);
router.get('/tasks/:taskId/:idx', tasksController.query);
router.post('/tasks/:taskId/start', tasksController.start);
router.post('/tasks/:taskId/:idx', tasksController.run);
router.post('/tasks/:taskId/submit', tasksController.submit);


exports.router = router;
