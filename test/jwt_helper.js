'use strict';

const jwt = require('../app/jwt');

exports.fillSuperagent = function (superagent) {
    const Request = superagent.Request;
    if (Request) {
        Request.prototype.bearer = function (token) {
            return this.set('Authorization', 'Bearer ' + token);
        };
    }
    return superagent;
};

exports.createToken = function(loginId, userId, admin) {
    return jwt.signToken({loginId, userId, admin});
};
