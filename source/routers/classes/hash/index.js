import dg from 'debug';

// Instruments
import {Classes, Lessons} from '../../../controllers';

const debug = dg('router:classes:hash');

export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const classes = new Classes(req.body);
        const { classHash } = req.params;

        const data = await classes.getByHash(classHash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const classes = new Classes(req.body);
        const { classHash } = req.params;

        const data = await classes.updateByHash(classHash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const classes = new Classes(req.body);
        const { classHash } = req.params;

        await classes.deleteByHash(classHash);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
