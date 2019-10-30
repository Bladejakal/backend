// Core
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

// Instruments
import { logger, errorLogger, NotFoundError, notFoundLogger, validationLogger } from './utils';

//Routers
import * as routers from './routers';

const sessionOptions = {
    key: 'user',
    secret: 'pa$$w0rd',
    resave: false, // disable session resave
    rolling: true, // reset max age on every use
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15m
    },
};

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

app.use(express.json());
app.use(session(sessionOptions));

// Logger
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        let body = null;

        if (req.method !== 'GET') {
            body = JSON.stringify(req.body, null, 2);
        }

        logger.debug(`${req.method} ${body ? `\n${body}` : ''}`);
        next();
    });
}

// Routers
app.use('/auth', routers.auth);
app.use('/users', routers.users);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);

app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        switch (error.name) {
            case 'NotFoundError':
                notFoundLogger.error(errorMessage);
                break;

            case 'ValidationError':
                validationLogger.error(errorMessage);
                break;

            default:
                errorLogger.error(errorMessage);
                break;
        }

        const status = statusCode ? statusCode : 500;
        res.status(status).json({ message: message });
    });
}

export { app };
