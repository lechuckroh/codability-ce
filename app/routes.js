'use strict';

const Router = require('koa-router');
const examsController = require('./exam/exams_controller');
const tasksController = require('./tasks/tasks_controller');
const router = new Router();
const packageJson = require('../package.json');

router.get('/', ctx => {
    ctx.body = `${packageJson.name} v${packageJson.version}`;
});

// Exam
router.get('/exams', examsController.getExamList);
router.post('/exams', examsController.postExam);
router.get('/exams/:examId', examsController.getExam);
router.put('/exams/:examId', examsController.putExam);
router.delete('/exams/:examId', examsController.deleteExam);
router.put('/exams/:examId/archive', examsController.archiveExam);
router.put('/exams/:examId/start', examsController.startExam);
router.put('/exams/:examId/submit', examsController.submitExam);

// TestRun
router.get('/exams/:examId/runs/:taskUnitTestId', examsController.getTestRun);
router.post('/exams/:examId/runs/:taskUnitTestId', examsController.runTest);

// Task
router.get('/tasks', tasksController.getTaskList);
router.get('/tasks/:taskId', tasksController.getTask);
router.post('/tasks', tasksController.postTask);
router.put('/tasks/:taskId', tasksController.putTask);
router.delete('/tasks/:taskId', tasksController.deleteTask);

// TaskTest
router.get('/tasks/:taskId/tests', tasksController.getTaskUnitTests);
router.post('/tasks/:taskId/tests', tasksController.postTaskUnitTest);
router.put('/tasks/:taskId/tests/:testId', tasksController.updateTaskUnitTest);
router.delete('/tasks/:taskId/tests/:testId', tasksController.deleteTaskUnitTest);

exports.router = router;
