const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;


const loggerFormat = printf(({name, message, timestamp}) => {
    return `${timestamp} ${name}: ${message}`;
});

const logger = createLogger({
    level: 'debug',
    format: combine(timestamp(), loggerFormat),
    transports: [
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        })
    ]
});

const validationErrorFormat = printf(({name, message, timestamp}) => {
    return `${timestamp} ${name}: ${message}`;
});

const validationErrorLogger = createLogger({
    level: 'debug',
    format: combine(timestamp(), validationErrorFormat),
    transports: [
        new transports.File({
            filename: 'logs/validation_errors.log',
            level: 'error',
        })
    ]
});

const notFoundErrorFormat = printf(({name, message, timestamp}) => {
    return `${timestamp} ${name}: ${message}`;
});

const notFoundErrorLogger = createLogger({
    level: 'debug',
    format: combine(timestamp(), notFoundErrorFormat),
    transports: [
        new transports.File({
            filename: 'logs/not_found_errors.log',
            level: 'error',
        })
    ]
});

export const errorLogger = () => (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        validationErrorLogger.log({
            level: 'error',
            name: error.name,
            message: error.message,
            validateErrors: error.validateErrors,
            payload: req.body
        })
    } else if (error.name === 'NotFoundError') {
        notFoundErrorLogger.log({
            level: 'error',
            name: error.name,
            message: error.message
        })
    } else {
        logger.log({
            level: 'error',
            name: error.name,
            message: error.message
        });
    }
    next();
};
