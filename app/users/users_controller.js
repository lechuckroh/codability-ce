'use strict';

const User = require('./user');
const jwt = require('../jwt');
const hashPassword = require('../crypto_helper').hashPassword;

/**
 * 사용자 추가
 */
exports.postUser = async function (ctx) {
    const body = ctx.request.body;

    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            const user = new User(body);
            await user.save();
            ctx.body = user.toObject();
            ctx.status = 201;
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 사용자 삭제
 */
exports.deleteUser = async function (ctx) {
    const {userId} = ctx.params;

    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            await User.findByIdAndRemove(userId);
            ctx.status = 204;
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 사용자 수정
 */
exports.putUser = async function (ctx) {
    const body = ctx.request.body;

    try {
        const {admin, userId} = jwt.decode(ctx.req.headers);
        if (admin || userId === body.userId) {
            if (body.password) {
                body.password = hashPassword(body.password);
            }
            await User.findByIdAndUpdate(userId, {$set: body});
            ctx.status = 200;
        } else {
            ctx.status = 401;
            ctx.body = "you don't have permission to modify.";
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 조건에 맞는 사용자 목록 조회
 */
exports.getUserList = async function (ctx) {
    try {
        const {admin} = jwt.decode(ctx.req.headers);
        if (admin) {
            const userList = await User.find({});
            ctx.status = 200;
            ctx.body = userList;
        } else {
            ctx.status = 401;
            ctx.body = 'admin required';
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};

/**
 * 사용자 조회
 */
exports.getUserById = async function (ctx) {
    const userIdToFind = ctx.params.userId;

    try {
        const {admin, userId} = jwt.decode(ctx.req.headers);
        if (admin || userId === userIdToFind) {
            const user = await User.findById(userIdToFind);
            if (user) {
                ctx.status = 200;
                ctx.body = user;
            } else {
                ctx.status = 400;
                ctx.body = 'user not found';
            }
        } else {
            ctx.status = 401;
            ctx.body = "you don't have permission to modify.";
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};
