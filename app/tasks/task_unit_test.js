'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaHelper = require('../schema_helper');

/**
 * 프로그래밍 언어별 문제 유닛 테스트
 */
const TaskUnitTestSchema = new Schema({
    // 제시할 초기 소스 코드
    initCode: {
        type: String,
        required: true
    },
    // 테스트용 소스 코드
    testCode: {
        type: String,
        required: true
    },
    // 사용할 프로그래밍 언어
    language: {
        type: String,
        required: true
    },
    // 이 프로그래밍 언어를 사용했을 때의 점수 가중치. 기본값은 1.0
    scoreFactor: {
        type: Number,
        default: 1.0,
        min: 0.1
    }
});

schemaHelper.customizeToJSON(TaskUnitTestSchema);
schemaHelper.customizeToObject(TaskUnitTestSchema);

const TaskUnitTest = mongoose.model('taskUnitTest', TaskUnitTestSchema);

module.exports = TaskUnitTest;
