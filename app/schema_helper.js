'use strict';

const transform = function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
};

exports.customizeToObject = function(schema) {
    if (!schema.options.toObject) {
        schema.options.toObject = {};
    }
    schema.options.toObject.transform = transform;
};

exports.customizeToJSON = function(schema) {
    if (!schema.options.toJSON) {
        schema.options.toJSON = {};
    }
    schema.options.toJSON.transform = transform;
};
