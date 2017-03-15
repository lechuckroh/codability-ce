const Koa = require('koa');
const app = new Koa();

const port = 3000;

// Access logger middleware
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const elapsed = new Date() - start;
    const request = ctx.request;
    console.log(`${request.ip} - ${ctx.method} ${ctx.url} - ${elapsed}ms`);
});

// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
})

// start server
app.listen(port);
console.log(`Listening port : ${port}`);
console.log('Server started.');