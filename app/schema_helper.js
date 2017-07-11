'use strict';

const getTransform = function (excludes) {
    return function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        if (excludes && Array.isArray(excludes)) {
            excludes.forEach(exclude => delete ret[exclude]);
        }
        return ret;
    };
};

exports.customizeToObject = function (schema, excludes = null) {
    if (!schema.options.toObject) {
        schema.options.toObject = {};
    }
    schema.options.toObject.transform = getTransform(excludes);
};

exports.customizeToJSON = function (schema, excludes = null) {
    if (!schema.options.toJSON) {
        schema.options.toJSON = {};
    }
    schema.options.toJSON.transform = getTransform(excludes);
};
