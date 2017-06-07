"use strict";

const assert = require('assert');
const app = require('../../app');
const request = require('supertest').agent(app.server);
const helper = require('../helper');
const Task = require('../../app/tasks/task');

describe('tasks', function () {
    describe('GET /tasks', function () {
        it('returns all tasks', async function () {
            const task1 = new Task({name: 'task1', level: 1});
            const task2 = new Task({name: 'task2', level: 2});
            const tasks = [task1, task2];
            await Task.remove({});
            await task1.save();
            await task2.save();

            const expected = JSON.stringify(tasks.map(o => o.toObject()));
            await request
                .get('/tasks')
                .expect(200)
                .expect(expected);
        });
    });

    describe('GET /tasks/taskId', function () {
        it('returns matching task', async function() {
            const task = new Task({name: 'task1', level: 1});
            await task.save();

            const taskId = task._id;

            const expected = JSON.stringify(task.toObject());
            await request
                .get(`/tasks/${taskId}`)
                .expect(200)
                .expect(expected);
        })
    });

    describe('POST /tasks', function () {
        it('returns matching task', async function() {
            await request
                .post('/tasks')
                .send({name: 'task1', level: 1})
                .expect(res => {
                    const body = res.body;
                    if (!body.id) {
                        throw new Error('id is not set');
                    }
                })
                .expect(201);
        })
    });

    describe('PUT /tasks', function () {
        it('returns statusCode 200', async function() {
            const task = new Task({name: 'task1', level: 1});
            await task.save();
            const taskId = task._id;

            await request
                .put(`/tasks/${taskId}`)
                .send({name: 'task2'})
                .expect(200);

            const taskAfterUpdate = await Task.findOne({_id: taskId});
            assert(taskAfterUpdate.name === 'task2');
        })
    });

    describe('DELETE /tasks/taskId', function () {
        it('returns statusCode 204', async function() {
            const task = new Task({name: 'task1', level: 1});
            await task.save();
            const taskId = task._id;

            await request
                .delete(`/tasks/${taskId}`)
                .expect(204);

            const taskAfterDelete = await Task.findOne({_id: taskId});
            assert(!taskAfterDelete);
        })
    });

    // describe('GET /tasks/taskId/tests', function () {
    //     it('returns matching tests', async function() {
    //         const task = new Task({name: 'task1', level: 1});
    //         await task.save();
    //
    //         const taskId = task._id;
    //
    //         const expected = JSON.stringify(task.toObject());
    //         await request
    //             .get(`/tasks/${taskId}`)
    //             .expect(200)
    //             .expect(expected);
    //     })
    // });
});