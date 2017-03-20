'use strict';

const fs = require('fs');
const rfs = require('rotating-file-stream');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./app/routes');
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

function initErrorLogger(app) {
    if (isProduction()) {
        app.on('error', (err, ctx) => {
            winston.error('server error', err, ctx);
        });
    } else {
        app.on('error', (err, ctx) => {
            console.error('server error', err, ctx);
        });
    }
}

// 라우트 설정
function registerRoutes(app) {
    app.use(bodyParser());

    const router = routes.router;
    app.use(router.routes());
    app.use(router.allowedMethods());
}

// 서버 시작
function startServer(app) {
    const port = 3000;
    winston.info('서버 시작', {port: port});
    return app.listen(port);
}

function start() {
    const app = new Koa();
    initLogger(app);
    initErrorLogger(app);
    registerRoutes(app);
    return startServer(app);
}

exports.start = start;

