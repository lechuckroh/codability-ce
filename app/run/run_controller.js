'use strict';

const controller = {};

controller.runTests = async function(ctx, next) {
    const body = ctx.request.body;
    console.log(body.language);
    console.log(body.code);

    // TODO
    ctx.body = 'run test is not implemented';

    await next();
};

controller.submit = async function (ctx, next) {
    const body = ctx.request.body;
    console.log(body.language);
    console.log(body.code);

    // TODO
    ctx.body = 'submit request is not implemented';

    await next();
};

module.exports = controller;
