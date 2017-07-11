'use strict';

const mongoose = require('mongoose');
const winston = require('winston');
const Task = require('../tasks/task');
const Exam = require('./exam');
const jwt = require('../jwt');


/**
 * 시험 목록 조회
 */
exports.getExamList = async function (ctx) {
    const {interviewee} = ctx.query;

    if (!interviewee) {
        ctx.status = 400;
        ctx.body = "'interviewee' parameter is not set";
        return;
    }

    try {
        const {admin, loginId} = jwt.decode(ctx.req.headers);
        const cond = {interviewee: interviewee};
        if (!admin) {
            cond.owner = loginId;
        }

        const exams = await Exam.find(cond);
        ctx.status = 200;
        ctx.body = exams;
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 시험 생성
 */
exports.postExam = async function (ctx) {
    const {interviewee, dueDate, taskIds} = ctx.request.body;
    const taskObjectIds = taskIds ?
        taskIds.map(id => mongoose.Types.ObjectId(id)) : [];

    try {
        const {admin, loginId} = jwt.decode(ctx.req.headers);
        if (admin) {
            const exam = new Exam({
                interviewee: interviewee,
                owner: loginId,
                archived: false,
                dueDate: dueDate,
                createdAt: Date.now(),
                score: 0
            });

            // taskIds 지정시 Task 추가
            if (taskObjectIds.length > 0) {
                const tasks = await Task.find({
                    '_id': {$in: taskObjectIds}
                });
                exam.tasks.push(...tasks);
            }
            await exam.save();

            ctx.status = 201;
            ctx.body = exam._id;
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
 * 시험 내용 조회
 */
exports.getExam = async function (ctx) {
    const {examId} = ctx.params;

    try {
        const exam = await Exam.findOne({
            '_id': examId
        });
        if (exam) {
            ctx.status = 200;
            ctx.body = exam;
        } else {
            ctx.status = 400;
            ctx.body = 'matching exam not found';
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 시험 내용 수정
 */
exports.putExam = async function (ctx, next) {
    const {examId} = ctx.params;

    // TODO: 권한 확인
    // TODO
};

/**
 * 시험 삭제
 */
exports.deleteExam = async function (ctx, next) {
    const {examId} = ctx.params;

    // TODO: 권한 확인

    // TODO
};

/**
 * archive 상태로 전환
 */
exports.archiveExam = async function (ctx, next) {
    const {examId} = ctx.params;

    // TODO: 권한 확인

    // TODO
};

/**
 * 문제 풀이 시작
 */
exports.startExam = async function (ctx, next) {
    const {examId} = ctx.params;

    // TODO: 권한 확인
    // TODO
};

/**
 * 코드 제출
 */
exports.submitExam = async function (ctx, next) {
    const {examId} = ctx.params;

    // TODO: 권한 확인
    // TODO
};

/**
 * 실행한 테스트 조회
 */
exports.getTestRun = async function (ctx, next) {
    const {examId, taskUnitTestId} = ctx.params;

    // TODO: 권한 확인
    // TODO
};

/**
 * 테스트 실행
 */
exports.runTest = async function (ctx, next) {
    const {examId, taskUnitTestId} = ctx.params;

    // TODO: 권한 확인
    // TODO
};


