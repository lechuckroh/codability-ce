'use strict';

const fs = require('fs');
const rfs = require('rotating-file-stream');
const Koa = require('koa');
const Router = require('koa-router');
const winston = require('winston');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

// Logger 설정
function initLogger(app) {
    const logDir = __dirname + '/logs';
    const accessLogFilename = 'access.log';
    const logFilename = 'app.log';

    const prodMode = isProduction();

    // create log directory
    if (prodMode) {
        fs.existsSync(logDir) || fs.mkdirSync(logDir);
    }

    // Access Logs
    if (prodMode) {
        const morgan = require('koa-morgan');
        const ws = rfs(accessLogFilename, {
            interval: '1d',
            path: logDir
        });
        app.use(morgan('combined', {stream: ws}))
    }
    else {
        app.use(require('koa-logger')());
    }

    // winston
    winston.level = process.env.LOG_LEVEL || 'debug';
    if (prodMode) {
        const path = `${logDir}/${logFilename}`;
        const pattern = '.yyyy-MM-dd';
        winston.add(winston.transports.DailyRotateFile, {
            filename: path,
            datePattern: pattern
        });
        winston.remove(winston.transports.Console);
    }
}

// 라우트 설정
function registerRoutes(app) {
    const router = new Router();
    router
        .get('/', function (ctx, next) {
            ctx.body = 'Hello Koa';
        })
        .get('/test', function (ctx, next) {
            ctx.body = 'Test Koa';
        });

    app.use(router.routes());
    app.use(router.allowedMethods());
}

// 서버 시작
function startServer(app) {
    const port = 3000;
    app.listen(port);
    winston.info('서버 시작', {port: port});
}


const app = new Koa();
initLogger(app);
registerRoutes(app);
startServer(app);
