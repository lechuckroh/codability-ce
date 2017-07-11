'use strict';

const winston = require('winston');
const Task = require('./task');
const jwt = require('../jwt');

/**
 * 문제 목록 조회
 */
exports.getTaskList = async function (ctx) {
    ctx.body = 'test';
    try {
        const taskList = await Task.find({});
        ctx.body = taskList.map(task => task.toObject());
        ctx.status = 200;
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 문제 생성
 */
exports.postTask = async function (ctx) {
    const body = ctx.request.body;
    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            const task = new Task(body);
            await task.save();
            ctx.body = task.toObject();
            ctx.status = 201;
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 문제 조회
 */
exports.getTask = async function (ctx) {
    const {taskId} = ctx.params;
    try {
        const task = await Task.findById(taskId);

        if (task) {
            ctx.status = 200;
            ctx.body = task.toObject();
        } else {
            ctx.status = 500;
            ctx.body = `No such task with taskId=${taskId}`;
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 문제 수정
 */
exports.putTask = async function (ctx) {
    const {taskId} = ctx.params;
    const body = ctx.request.body;
    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            await Task.findByIdAndUpdate(taskId, {$set: body});
            ctx.status = 200;
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 문제 삭제
 */
exports.deleteTask = async function (ctx) {
    const {taskId} = ctx.params;

    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            await Task.findByIdAndRemove(taskId);
            ctx.status = 204;
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 문제 테스트 조회
 */
exports.getTaskUnitTests = async function (ctx) {
    const {taskId} = ctx.params;

    try {
        const task = await Task.findById(taskId);
        ctx.body = task ? task.unitTests : [];
        ctx.status = 200;
    } catch (e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 문제 테스트 추가
 */
exports.postTaskUnitTest = async function (ctx) {
    const {taskId} = ctx.params;
    const body = ctx.request.body;

    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            const task = await Task.findById(taskId);
            if (task) {
                task.unitTests.push(body);
                await task.save();
                ctx.status = 201;
            } else {
                ctx.status = 400;
                ctx.body = 'task not found';
            }
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 문제 테스트 수정
 */
exports.updateTaskUnitTest = async function (ctx) {
    const {taskId, testId} = ctx.params;
    const body = ctx.request.body;
    const updateMap = Object.entries(body).reduce(function (map, entry) {
        const [key, value] = entry;
        map[`unitTests.$.${key}`] = value;
        return map;
    }, {});

    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            await Task.update({
                _id: taskId,
                unitTests: {
                    $elemMatch: {
                        _id: testId
                    }
                }
            }, {
                '$set': updateMap
            });
            ctx.status = 200;
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 문제 테스트 삭제
 */
exports.deleteTaskUnitTest = async function (ctx) {
    const {taskId, testId} = ctx.params;

    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            await Task.update({
                _id: taskId,
                unitTests: {
                    $elemMatch: {
                        _id: testId
                    }
                }
            }, {
                '$pull': {
                    unitTests: {
                        _id: testId
                    }
                }
            });
            ctx.status = 204;
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = e;
    }
};
