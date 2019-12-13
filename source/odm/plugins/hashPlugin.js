// Core
const v4 = require('uuid/v4');

export const hashPlugin = (schema, options) => {
    schema.add({
        hash: String,
    });

    schema.pre('save', function(next) {
        this.hash = v4();
        next();
    });

    if (options && options.index) {
        schema.path('hash').index(true);
    }

    if (options && options.unique) {
        schema.path('hash').unique(true);
    }
};
