import dg from 'debug';

// Instruments
import {Lessons} from '../../controllers';

const debug = dg('router:lessons');

export const get = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const data = await lessons.get();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const data = await lessons.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
