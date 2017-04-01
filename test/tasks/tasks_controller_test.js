"use strict";

const app = require('../../app');
const request = require('supertest').agent(app.server);

describe('tasks', function() {
    describe('when GET /tasks/-1/status', function() {
        it('should return 404', function(done) {
            request
                .get('/tasks/-1/status')
                .expect(404, done)
        });
    });
});