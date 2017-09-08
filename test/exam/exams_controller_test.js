"use strict";

const superagent = require('superagent');
const jwtHelper = require('../jwt_helper');
jwtHelper.fillSuperagent(superagent);

const assert = require('assert');
const app = require('../../app');
const request = require('supertest').agent(app.server);
const helper = require('../helper');
const Exam = require('../../app/exam/exam');

describe('exams', function () {

    describe('GET /exams', function () {
        it('returns exams by interviewee', async function () {
            const exam1 = new Exam({interviewee: 'Foo', owner: 'foo'});
            const exam2 = new Exam({interviewee: 'Bar', owner: 'bar'});
            const exam3 = new Exam({interviewee: 'Bar', owner: 'foo'});
            const exam4 = new Exam({interviewee: 'Bar', owner: 'foo'});
            await Exam.remove({});
            await exam1.save();
            await exam2.save();
            await exam3.save();
            await exam4.save();

            const expected = JSON.stringify([exam3, exam4]);
            await request
                .get('/exams')
                .bearer(jwtHelper.createToken('foo', 0, false))
                .query({interviewee: 'Bar'})
                .expect(200)
                .expect(expected);
        });
    });

    describe('POST /exams', function () {
        it('adds an exam', async function () {
            await request
                .post('/exams')
                .bearer(jwtHelper.createToken('foo', 0, true))
                .send({
                    interviewee: 'foo',
                    dueDate: '2017-01-01'
                })
                .expect(res => {
                    const body = res.body;
                    if (!body) {
                        throw new Error('result is not set');
                    }
                })
                .expect(201);
        })
    });

    describe('GET /exams/:examId', function () {
        it('returns an exam', async function () {
            const exam1 = new Exam({interviewee: 'Foo'});
            const exam2 = new Exam({interviewee: 'Bar'});
            await exam1.save();
            await exam2.save();

            const expected = JSON.stringify(exam2);
            await request
                .get(`/exams/${exam2._id}`)
                .expect(200)
                .expect(expected);
        });
    });

    describe('PUT /tasks/:examId', function () {
        it('updates an exam', async function () {
            const exam = new Exam({interviewee: 'Foo'});
            await exam.save();
            const params = {
                interviewee: 'FooBar',
                dueDate: new Date().toISOString()
            };
            await request
                .put(`/exams/${exam._id}`)
                .bearer(jwtHelper.createToken('foo', 0, true))
                .send(params)
                .expect(200);

            const updated = await Exam.findById(exam._id);
            assert(updated.interviewee === params.interviewee);
            assert(updated.dueDate.toISOString() === params.dueDate);
        })
    });

    describe('DELETE /exams/:examId', function () {
        it('removes an exam', async function () {
            const exam1 = new Exam({interviewee: 'Foo'});
            const exam2 = new Exam({interviewee: 'Bar'});
            await exam1.save();
            await exam2.save();

            await request
                .delete(`/exams/${exam2._id}`)
                .bearer(jwtHelper.createToken('foo', 0, true))
                .send()
                .expect(204);

            const result = await Exam.findById(exam2._id);
            assert(result === null);
        })
    });

    describe('PUT /exams/:examId/archive', function () {
        it('archives an exam', async function () {
            const exam = new Exam({interviewee: 'Bar'});
            await exam.save();

            await request
                .put(`/exams/${exam._id}/archive`)
                .bearer(jwtHelper.createToken('foo', 0, true))
                .send()
                .expect(200);

            const result = await Exam.findById(exam._id);
            assert(result.archived === true);
        })
    });

    describe('PUT /exams/:examId/start', function () {
        it('starts an exam', async function () {
            const exam = new Exam({interviewee: 'Bar'});
            await exam.save();
            const now = Date.now();

            await request
                .put(`/exams/${exam._id}/start`)
                .bearer(jwtHelper.createToken('foo', 0, true))
                .send()
                .expect(200);

            const result = await Exam.findById(exam._id);
            assert(result.startedAt >= now);
        })
    });

    describe('PUT /exams/:examId/submit', function () {
        it('submits an exam', async function () {
            const exam = new Exam({interviewee: 'Bar'});
            await exam.save();
            const now = Date.now();

            await request
                .put(`/exams/${exam._id}/submit`)
                .bearer(jwtHelper.createToken('foo', 0, true))
                .send()
                .expect(200);

            const result = await Exam.findById(exam._id);
            assert(result.finishedAt >= now);
        })
    });
});