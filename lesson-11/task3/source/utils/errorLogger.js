const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;


const serverFormat = printf(({name, message, timestamp}) => {
    return `${timestamp} ${name}: ${message}`;
});

const logger = createLogger({
    level: 'debug',
    format: combine(timestamp(), serverFormat),
    transports: [
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        })
    ]
});

export const errorLogger = () => (error, req, res, next) => {
    logger.log({
        level: 'error',
        name: error.name,
        message: error.message
    });

    next();
};
