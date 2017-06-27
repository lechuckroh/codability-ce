"use strict";

const assert = require('assert');
const app = require('../../app');
const request = require('supertest').agent(app.server);
const helper = require('../helper');
const Exam = require('../../app/exam/exam');

describe('exams', function () {

    describe('GET /exams', function () {
        it('returns exams by interviewee', async function () {
            const exam1 = new Exam({interviewee: 'Foo'});
            const exam2 = new Exam({interviewee: 'Bar'});
            const exam3 = new Exam({interviewee: 'Bar'});
            await Exam.remove({});
            await exam1.save();
            await exam2.save();
            await exam3.save();

            const expected = JSON.stringify([exam2, exam3]);
            await request
                .get('/exams')
                .query({interviewee: 'Bar'})
                .expect(200)
                .expect(expected);
        });
    });

    describe('POST /exams', function () {
        it('adds an exam', async function () {
            await request
                .post('/exams')
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
            await Exam.remove({});
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
            // TODO
        })
    });

    describe('DELETE /exams/:examId', function () {
        it('removes an exam', async function () {
            // TODO
        })
    });

    describe('PUT /exams/:examId/archive', function () {
        it('archives an exam', async function () {
            // TODO
        })
    });

    describe('PUT /exams/:examId/start', function () {
        it('starts an exam', async function () {
            // TODO
        })
    });

    describe('PUT /exams/:examId/submit', function () {
        it('submits an exam', async function () {
            // TODO
        })
    });
});