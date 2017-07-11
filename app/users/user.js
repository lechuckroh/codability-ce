'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaHelper = require('../schema_helper');

/**
 * 사용자
 */
const UserSchema = new Schema({
    loginId: String,
    name: String,
    password: String,
    admin: Boolean,
    createdAt: Date,
    finishedAt: Date
});

const excludes = ['password'];
schemaHelper.customizeToJSON(UserSchema, excludes);
schemaHelper.customizeToObject(UserSchema, excludes);

const User = mongoose.model('user', UserSchema);

module.exports = User;
