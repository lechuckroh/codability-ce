'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String
});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
