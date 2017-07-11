'use strict';

const hashPassword = require('../crypto_helper').hashPassword;
const jwt = require('../jwt');
const User = require('../users/user');

exports.login = async function (ctx) {
    const {loginId, password} = ctx.request.body;

    try {
        const user = await User.find({
            loginId: loginId
        });
        if (!user) {
            ctx.status = 401;
            ctx.body = {message: "User not found"};
            return;
        }

        if (user.password !== hashPassword(password)) {
            ctx.status = 401;
            ctx.body = {message: "Password mismatch"};
            return;
        }

        const token = jwt.signToken({
            loginId: loginId,
            userId: user._id,
            admin: user.admin
        });

        ctx.status = 200;
        ctx.body = {
            token: token,
            message: "Successfully logged in!"
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
};
