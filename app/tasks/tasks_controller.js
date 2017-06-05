'use strict';

const winston = require('winston');
const Task = require('./task');

/**
 * 문제 목록 조회
 */
exports.getTaskList = async function (ctx, next) {
    ctx.body = 'test';
    try {
        const taskList = await Task.find({});
        ctx.body = taskList.map(task => task.toObject());
        ctx.status = 200;
    } catch (err) {
        ctx.status = 500;
        ctx.body = err;
    }
};

/**
 * 문제 생성
 */
exports.postTask = async function (ctx, next) {
    const body = ctx.request.body;
    try {
        const task = new Task(body);
        await task.save();
        ctx.body = task.toObject();
        ctx.status = 201;
    } catch (err) {
        ctx.status = 500;
        ctx.body = err;
    }
};

/**
 * 문제 조회
 */
exports.getTask = async function (ctx, next) {
    const {taskId} = ctx.params;
    try {
        const task = await Task.findOne({_id: taskId});

        if (task) {
            ctx.status = 200;
            ctx.body = task.toObject();
        } else {
            ctx.status = 500;
            ctx.body = `No such task with taskId=${taskId}`;
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = err;
    }
};

/**
 * 문제 수정
 */
exports.putTask = async function (ctx, next) {
    const {taskId} = ctx.params;
    const body = ctx.request.body;
    try {
        await Task.update(Object.assign({_id: taskId}), body);
        ctx.status = 200;
    } catch (err) {
        ctx.status = 500;
        ctx.body = err;
    }
};

/**
 * 문제 삭제
 */
exports.deleteTask = async function (ctx, next) {
    const {taskId} = ctx.params;

    // TODO
};

/**
 * 문제 테스트 조회
 */
exports.getTaskUnitTests = async function (ctx, next) {
    const {taskId} = ctx.params;
    // TODO
};

/**
 * 문제 테스트 추가
 */
exports.postTaskUnitTest = async function (ctx, next) {
    const {taskId} = ctx.params;
    // TODO
};

/**
 * 문제 테스트 수정
 */
exports.updateTaskUnitTest = async function (ctx, next) {
    const {taskId, testId} = ctx.params;
    // TODO
};

/**
 * 문제 테스트 삭제
 */
exports.deleteTaskUnitTest = async function (ctx, next) {
    const {taskId, testId} = ctx.params;
    // TODO
};
