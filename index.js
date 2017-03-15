'use strict';

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const port = 3000;

// 접속 로그 미들웨어
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const elapsed = new Date() - start;
    const request = ctx.request;
    console.log(`${request.ip} - ${ctx.method} ${ctx.url} - ${elapsed}ms`);
});

// 라우터
router
    .get('/', function (ctx, next) {
        ctx.body = 'Hello Koa';
    })
    .get('/test', function (ctx, next) {
        ctx.body = 'Test Koa';
    });

app.use(router.routes());
app.use(router.allowedMethods());

// 서버 시작
app.listen(port);
console.log(`서버 시작. 포트: ${port}`);
