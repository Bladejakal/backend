import dg from 'debug';

const debug = dg('router:classes:education');
// Instruments
import {Classes, Lessons} from '../../../controllers';

export const enroll = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const classes = new Classes(req.body);
        const { classHash } = req.params;
        const data = await classes.enroll(classHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const expel = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const classes = new Classes(req.body);
        const { classHash } = req.params;
        await classes.expel(classHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
