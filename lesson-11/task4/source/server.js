// Core
import express from 'express';
import bodyParser from 'body-parser';
import {logger, errorLogger, allRequest} from './utils';

//Routers
import * as routers from './routers';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(logger());
}

// Routers
app.use('/auth', routers.auth);
app.use('/users', routers.users);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);

app.all('*', allRequest());

if (process.env.NODE_ENV !== 'test') {
    app.use(errorLogger());
}

export { app };
