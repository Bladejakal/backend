import {NotFoundError} from '../helpers';

export const allRequest = () => (req, res, next) => {
    const error = new NotFoundError(`Method: ${req.method} : Endpoint: ${req.originalUrl}`, 404);

    next(error)
};
