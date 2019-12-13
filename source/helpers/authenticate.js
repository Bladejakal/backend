// Instruments
import {NotFoundError} from './';

export const authenticate = (type = null, checkHash = false) => (req, res, next) => {
    if (!req.session.user) {
        return next(new NotFoundError('cookie not found', 401));
    }

    if (type) {
        if (req.session.user.__t !== type) {
            res.status(401).json({ message: 'You don\'t have access to this part' });
        }
    }

    if (checkHash) {
        const { hash } = req.params;

        if (req.session.user.hash !== hash) {
            res.status(401).json({ message: 'You don\'t have access to this part as well' });
        }
    }

    next();
};
