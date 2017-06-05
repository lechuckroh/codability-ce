'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

if (!TaskSchema.options.toObject) {
    TaskSchema.options.toObject = {};
}

TaskSchema.options.toObject.transform = function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
};

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
