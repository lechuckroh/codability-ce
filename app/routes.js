'use strict';

const Router = require('koa-router');
const authController = require('./auth/auth_controller');
const examsController = require('./exam/exams_controller');
const tasksController = require('./tasks/tasks_controller');
const usersController = require('./users/users_controller');
const router = new Router();
const packageJson = require('../package.json');
const jwt = require('./jwt');

const koaJwt = jwt.koaJwt;

const get = (uri, fn) => router.get(uri, fn);
const post = (uri, fn) => router.post(uri, fn);
const put = (uri, fn) => router.put(uri, fn);
const del = (uri, fn) => router.delete(uri, fn);
const jwtGet = (uri, fn) => router.get(uri, koaJwt, fn);
const jwtPost = (uri, fn) => router.post(uri, koaJwt, fn);
const jwtPut = (uri, fn) => router.put(uri, koaJwt, fn);
const jwtDel = (uri, fn) => router.delete(uri, koaJwt, fn);


const registerRoutes = function () {
    get('/', ctx => {
        ctx.body = `${packageJson.name} v${packageJson.version}`;
    });

    // Auth
    post('/auth/login', authController.login);

    // Exam
    jwtGet('/exams', examsController.getExamList);
    jwtPost('/exams', examsController.postExam);
    get('/exams/:examId', examsController.getExam);
    put('/exams/:examId', examsController.putExam);
    del('/exams/:examId', examsController.deleteExam);
    put('/exams/:examId/archive', examsController.archiveExam);
    put('/exams/:examId/start', examsController.startExam);
    put('/exams/:examId/submit', examsController.submitExam);

    // TestRun
    get('/exams/:examId/runs/:taskUnitTestId', examsController.getTestRun);
    post('/exams/:examId/runs/:taskUnitTestId', examsController.runTest);

    // Task
    jwtGet('/tasks', tasksController.getTaskList);
    jwtGet('/tasks/:taskId', tasksController.getTask);
    jwtPost('/tasks', tasksController.postTask);
    jwtPut('/tasks/:taskId', tasksController.putTask);
    jwtDel('/tasks/:taskId', tasksController.deleteTask);

    // TaskTest
    jwtGet('/tasks/:taskId/tests', tasksController.getTaskUnitTests);
    jwtPut('/tasks/:taskId/tests/:testId', tasksController.updateTaskUnitTest);
    jwtDel('/tasks/:taskId/tests/:testId', tasksController.deleteTaskUnitTest);

    // User
    jwtGet('/users', usersController.getUserList);
    jwtGet('/users/:userId', usersController.getUserById);
    jwtPost('/users', usersController.postUser);
    jwtPut('/users', usersController.putUser);
    jwtDel('/users/:userId', usersController.deleteUser);
};

exports.router = router;
exports.registerRoutes = registerRoutes;
