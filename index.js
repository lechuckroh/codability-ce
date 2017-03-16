'use strict';

const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');


// Logger 설정
function initLogger(app) {
    if (process.env.NODE_ENV === 'production') {
        const logDir = __dirname + '/logs';
        const accessLogFilename = 'access.log';
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        const morgan = require('koa-morgan');
        const path = `${logDir}/${accessLogFilename}`;
        const ws = fs.createWriteStream(path, {flags: 'a'});
        app.use(morgan('combined', {stream: ws}))
    }
    else {
        app.use(require('koa-logger')());
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
    console.log(`서버 시작. 포트: ${port}`);
}


const app = new Koa();
initLogger(app);
registerRoutes(app);
startServer(app);
