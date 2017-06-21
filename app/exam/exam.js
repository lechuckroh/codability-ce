'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaHelper = require('../schema_helper');
const TestRun = require('./test_run');

/**
 * 인터뷰 대상자가 풀어야 할 문제들
 */
const ExamSchema = new Schema({
    interviewee: String,
    owner: String,
    archived: Boolean,
    dueDate: Date,
    createdAt: Date,
    startedAt: Date,
    finishedAt: Date,
    score: Number,
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    testRuns: [TestRun.schema]
});

schemaHelper.customizeToJSON(ExamSchema);
schemaHelper.customizeToObject(ExamSchema);

const Exam = mongoose.model('exam', ExamSchema);

module.exports = Exam;
