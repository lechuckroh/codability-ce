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

/**
 * 풀어야할 문제
 */
const TaskSchema = new Schema({
    // 문제 이름
    name: {
        type: String,
        validate: {
            validator: name => name.length > 2,
            message: 'name must be longer than 2 characters'
        },
        required: true
    },
    // 문제 상세 설명
    description: String,
    // 문제 난이도. 1이 가장 쉬움
    level: {
        type: Number,
        default: 1,
        min: 1,
        required: true
    },
    unitTests: [TaskUnitTestSchema]
});

schemaHelper.customizeToJSON(TaskSchema);
schemaHelper.customizeToObject(TaskSchema);

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
