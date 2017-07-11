'use strict';

const crypto = require('crypto');

exports.hashPassword = function (password) {
    if (password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    } else {
        return '';
    }
};
