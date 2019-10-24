export class ValidationError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, ValidationError);
        this.name = 'ValidationError';
        this.statusCode = args[1] || 400;
    }
}

export class NotFoundError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, NotFoundError);
        this.name = 'NotFoundError';
        this.statusCode = args[1] || 404;
    }
}
