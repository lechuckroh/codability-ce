'use strict';

const winston = require('winston');
const Task = require('./task');

exports.status = async function(ctx, next) {
    const taskId = ctx.params.taskId;
    const task = await Task.findOne({id: taskId});

    if (task) {
        ctx.status = 200;
        ctx.body = task;
    } else {
        ctx.status = 404;
        ctx.body = `No such task with taskId=${taskId}`;
    }
};

exports.query = async function(ctx, next) {
    const taskId = ctx.params.taskId;
    const questionIdx = ctx.params.idx;

    winston.info(taskId, questionIdx);

    // TODO
    ctx.status = 501;
    ctx.body = 'query is not implemented';

    await next();
};

exports.start = async function(ctx, next) {
    const taskId = ctx.params.taskId;

    winston.info(taskId);

    // TODO
    ctx.status = 501;
    ctx.body = 'start is not implemented';

    await next();
};

exports.run = async function (ctx, next) {
    const body = ctx.request.body;
    const lang = body.lang;
    const code = body.code;
    const taskId = ctx.params.taskId;
    const idx = ctx.params.idx;

    winston.info(taskId, idx, lang, code);

    // TODO
    ctx.status = 501;
    ctx.body = 'tasks test is not implemented';

    await next();
};

exports.submit = async function (ctx, next) {
    const body = ctx.request.body;
    const codes = body.codes;
    const taskId = ctx.params.id;

    winston.info(taskId, codes);

    // TODO
    ctx.status = 501;
    ctx.body = 'submit request is not implemented';

    await next();
};
