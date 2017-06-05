'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 인터뷰 대상자가 풀어야 할 문제들
 */
const ExamSchema = new Schema({
    archived: Boolean,
    dueDate: Date,
    startedAt: Date,
    finishedAt: Date,
    score: Number,
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    testRuns: [{
        type: Schema.Types.ObjectId,
        ref: 'testRun'
    }]
});

const Exam = mongoose.model('exam', ExamSchema);

module.exports = Exam;
