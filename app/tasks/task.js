'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: name => name.length > 2,
            message: 'name must be longer than 2 characters'
        },
        required: [true, 'name is required']
    }
});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
