// Core
import dg from 'debug';

// Instruments
import { Classes } from '../../../controllers';

const debug = dg('router:classes:education');

export const enroll = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { classHash } = req.params;
        const model = new Classes({ hash: classHash, payload: req.body });

        await model.enroll();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const expel = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { classHash } = req.params;
        const model = new Classes({ hash: classHash, payload: req.body });

        await model.expel();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
