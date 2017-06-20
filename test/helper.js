'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const DatabaseCleaner = require('database-cleaner');
const winston = require('winston');

before(done => {
    // Mongo DB 데이터베이스 초기화
    mongoose.connection
        .once('open', () => {
            const databaseCleaner = new DatabaseCleaner('mongodb');
            databaseCleaner.clean(mongoose.connection.db, () => {
                winston.info('Database cleared.');
                done();
            });
        })
        .on('error', (err) => {
            done(err);
        });
});

