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
exports.putExam = async function (ctx) {
    const {examId} = ctx.params;
    const body = ctx.request.body;

    try {
        const exam = await Exam.findOne({
            '_id': examId
        });
        if (exam) {
            const {admin, loginId} = jwt.decode(ctx.req.headers);
            if (admin || loginId === exam.owner) {
                await exam.update({$set: body});
                ctx.status = 200;
            } else {
                ctx.status = 401;
                ctx.body = 'no permission';
            }
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
 * 시험 삭제
 */
exports.deleteExam = async function (ctx) {
    const {examId} = ctx.params;
    try {
        const exam = await Exam.findOne({
            '_id': examId
        });
        if (exam) {
            const {admin, loginId} = jwt.decode(ctx.req.headers);
            if (admin || loginId === exam.owner) {
                await exam.remove();
                ctx.status = 204;
            } else {
                ctx.status = 401;
                ctx.body = 'no permission';
            }
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
 * archive 상태로 전환
 */
exports.archiveExam = async function (ctx) {
    const {examId} = ctx.params;
    try {
        const exam = await Exam.findOne({
            '_id': examId
        });
        if (exam) {
            const {admin, loginId} = jwt.decode(ctx.req.headers);
            if (admin || loginId === exam.owner) {
                exam.archived = true;
                await exam.save();
                ctx.status = 200;
            } else {
                ctx.status = 401;
                ctx.body = 'no permission';
            }
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
 * 문제 풀이 시작
 */
exports.startExam = async function (ctx) {
    const {examId} = ctx.params;
    try {
        const exam = await Exam.findOne({
            '_id': examId
        });
        if (exam) {
            const {admin, loginId} = jwt.decode(ctx.req.headers);
            if (admin || loginId === exam.owner) {
                exam.startedAt = Date.now();
                await exam.save();
                ctx.status = 200;
            } else {
                ctx.status = 401;
                ctx.body = 'no permission';
            }
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
 * TestRun 점수 계산
 */
const calcScore = function (exam) {
    const testRuns = exam.testRuns || [];
    if (testRuns.length === 0) {
        return 0;
    }

    const lastTestRunByTask = testRuns.reduce((result, testRun) => {
        result[testRun.task] = testRun;
        return result;
    }, {});

    let maxScore = 0;
    let score = 0;
    Object.entries(lastTestRunByTask).forEach(([task, testRun]) => {
        const totalCount = testRun.successCount + testRun.failCount;
        const factor = task.level * task.unitTest.scoreFactor;

        maxScore += factor;
        score += factor * (testRun.successCount / totalCount);
    });

    return score * 100 / maxScore;
};

/**
 * 코드 제출
 */
exports.submitExam = async function (ctx) {
    const {examId} = ctx.params;
    try {
        const exam = await Exam.findOne({
            '_id': examId
        });
        if (exam) {
            const {admin, loginId} = jwt.decode(ctx.req.headers);
            if (admin || loginId === exam.owner) {
                exam.score = calcScore(exam.testRuns);
                exam.finishedAt = Date.now();
                await exam.save();
                ctx.status = 200;
            } else {
                ctx.status = 401;
                ctx.body = 'no permission';
            }
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


