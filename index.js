const Koa = require('koa');
const app = new Koa();

const port = 3000;

// 접속 로그 미들웨어
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const elapsed = new Date() - start;
    const request = ctx.request;
    console.log(`${request.ip} - ${ctx.method} ${ctx.url} - ${elapsed}ms`);
});

// 응답
app.use(ctx => {
    ctx.body = 'Hello Koa';
})

// 서버 시작
app.listen(port);
console.log(`서버 시작. 포트: ${port}`);
