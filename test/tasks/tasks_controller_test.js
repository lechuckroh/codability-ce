"use strict";

const app = require('../../app');
const request = require('supertest').agent(app.server);
const helper = require('../helper');

describe('tasks', function () {
    describe('GET /tasks/:taskId/status', function () {
        it('invalid taskId returns 404', function (done) {
            request
                .get('/tasks/-1/status')
                .expect(404, done)
        });
    });
});