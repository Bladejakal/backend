import dg from 'debug';

// Instruments
import { Auth } from '../../controllers';

const debug = dg('router:auth');

export const login = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const header = req.get('authorization');
        const auth = new Auth(header);
        const data = await auth.login();

        req.session.user = data;

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
