'use strict';

exports.status = async function(ctx, next) {
    const taskId = ctx.params.taskId;

    // TODO
    ctx.status = 404;
    ctx.body = 'status is not implemented';

    await next();
};

exports.query = async function(ctx, next) {
    const taskId = ctx.params.taskId;
    const idx = ctx.params.idx;

    console.log(taskId, idx);

    // TODO
    ctx.body = 'query is not implemented';

    await next();
};

exports.start = async function(ctx, next) {
    const taskId = ctx.params.taskId;

    console.log(taskId);

    // TODO
    ctx.body = 'start is not implemented';

    await next();
};

exports.run = async function (ctx, next) {
    const body = ctx.request.body;
    const lang = body.lang;
    const code = body.code;
    const taskId = ctx.params.taskId;
    const idx = ctx.params.idx;

    console.log(taskId, idx, lang, code);

    // TODO
    ctx.body = 'tasks test is not implemented';

    await next();
};

exports.submit = async function (ctx, next) {
    const body = ctx.request.body;
    const codes = body.codes;
    const taskId = ctx.params.id;

    console.log(taskId, codes);

    // TODO
    ctx.body = 'submit request is not implemented';

    await next();
};
