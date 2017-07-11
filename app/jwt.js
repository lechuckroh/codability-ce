'use strict';

const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const winston = require('winston');

const SECRET_FILENAME = __dirname + '/../config/codability.secret';
const SECRET_ENV = 'CODABILITY_SECRET';
let secret = process.env[SECRET_ENV];
if (!secret) {
    try {
        secret = fs.readFileSync(SECRET_FILENAME);
    } catch (e) {}
}

if (!secret) {
    winston.error(`Secret key not found from '${SECRET_ENV}' env or '${SECRET_FILENAME}' file.`);
    secret = 'A very secret key';
}

exports.koaJwt = koaJwt({
    secret: secret
});

exports.signToken = function(payload, options, callback) {
    return jwt.sign(payload, secret, options, callback);
};

exports.decode = function(headers) {
    if (headers && headers.authorization) {
        const token = headers.authorization.replace('Bearer ', '');
        return jwt.verify(token, secret);
    } else {
        return null;
    }
};