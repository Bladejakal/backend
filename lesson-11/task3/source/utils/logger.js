const {createLogger, format, transports} = require('winston');
const {combine, timestamp} = format;

export const logger = () => (req, res, next) => {
    const logger = createLogger({
        level: 'debug',
        format: combine(timestamp()),
        transports: [
            new transports.Console({
                format: format.simple()
            })
        ]
    });

    logger.log({
        level: 'info',
        message: 'This is request debug data:',
        method: req.method,
        payload: req.body
    });

    next();
};
