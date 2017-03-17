'use strict';

const Router = require('koa-router');
const runController = require('./run/run_controller');
const router = new Router();
const packageJson = require('../package.json');

router.get('/', ctx => {
    ctx.body = `${packageJson.name} v${packageJson.version}`;
});

router.post('/run/test', runController.runTests);
router.post('/run/submit', runController.submit);


exports.router = router;
