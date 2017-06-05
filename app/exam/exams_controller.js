'use strict';

const mongoose = require('mongoose');
const winston = require('winston');
const Task = require('../tasks/task');
const Exam = require('./exam');
const TestRun = require('./test_run');

/**
 * 시험 목록 조회
 */
exports.getExamList = async function (ctx, next) {
    // TODO
};

/**
 * 시험 생성
 */
exports.postExam = async function (ctx, next) {
    const {taskIds} = ctx.request.body;
    const taskObjectIds = taskIds.map(id => mongoose.Types.ObjectId(id));
    try {
        const tasks = await Task.find({
            '_id': {$in: taskObjectIds}
        });

        const exam = new Exam({
            archived: false,
            dueDate: null,
            score: 0
        });
        exam.tasks.push(...tasks);
        exam.save();

        ctx.status = 200;
        ctx.body = exam.hash;
    } catch (e) {
        ctx.status = 500;
        ctx.body = `Failed`;
    }
};

/**
 * 시험 내용 조회
 */
exports.getExam = async function (ctx, next) {
    const {examId} = ctx.params;
    // TODO
};

/**
 * 시험 내용 수정
 */
exports.putExam = async function (ctx, next) {
    const {examId} = ctx.params;
    // TODO
};

/**
 * archive 상태로 전환
 */
exports.archiveExam = async function (ctx, next) {
    const {examId} = ctx.params;
    // TODO
};

/**
 * 문제 풀이 시작
 */
exports.startExam = async function (ctx, next) {
    const {examId} = ctx.params;
    // TODO
};

/**
 * 코드 제출
 */
exports.submitExam = async function (ctx, next) {
    const {examId} = ctx.params;
    // TODO
};

/**
 * 실행한 테스트 조회
 */
exports.getTestRun = async function (ctx, next) {
    const {examId, taskUnitTestId} = ctx.params;
    // TODO
};

/**
 * 테스트 실행
 */
exports.runTest = async function (ctx, next) {
    const {examId, taskUnitTestId} = ctx.params;
    // TODO
};


