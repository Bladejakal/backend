import {getPassword} from './env';

export const auth = () => (req, res, next) => {
    const password = getPassword();

    const authorizationPassword = req.headers['authorization'];

    if (password === authorizationPassword) {
        return next();
    }

    res.status(401).json({message: "not authenticated"});
};
