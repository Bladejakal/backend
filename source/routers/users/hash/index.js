import dg from 'debug';

// Instruments
import { Users } from '../../../controllers';

const debug = dg('router:users:hash');

export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const user = new Users(req.body);
        const { userHash } = req.params;

        const data = await user.getByHash(userHash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const user = new Users(req.body);
        const { userHash } = req.params;

        const data = await user.updateByHash(userHash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const user = new Users(req.body);
        const { userHash } = req.params;

        await user.deleteByHash(userHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
