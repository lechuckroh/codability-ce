'use strict';

const MongoDB = require('mongodb');
const DatabaseCleaner = require('database-cleaner');
const winston = require('winston');

const app = require('../app');
const config = app.config;

before(done => {
    // Mongo DB 데이터베이스 초기화
    const callback = (err, db) => {
        if (err) {
            done(err);
        } else {
            const databaseCleaner = new DatabaseCleaner('mongodb');
            databaseCleaner.clean(db, () => {
                winston.info('database cleared.');
                done();
            });
        }
    };

    const client = MongoDB.MongoClient;
    client.connect(config.mongo.uri, {
        server: {poolSize: 1},
        native_parser: true,
        uri_decode_auth: true
    }, callback);
});

