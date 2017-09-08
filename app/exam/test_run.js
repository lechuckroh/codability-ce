'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 인터뷰 대상자가 실행한 테스트 정보
 */
const TestRunSchema = new Schema({
    runAt: Date,
    submit: Boolean,
    code: String,
    language: String,
    successCount: Number,
    failCount: Number,
    task: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    test: {
        type: Schema.Types.ObjectId,
        ref: 'taskUnitTest'
    }
});

const TestRun = mongoose.model('testRun', TestRunSchema);

module.exports = TestRun;
