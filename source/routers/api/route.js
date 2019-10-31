import dg from 'debug';
import jwt from 'jsonwebtoken';

const debug = dg('router:api');

export const login = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    const token = jwt.sign({ name: 'John' }, 'pa$$w0rd');

    res.header('X-Token', token);

    res.sendStatus(204);
};
