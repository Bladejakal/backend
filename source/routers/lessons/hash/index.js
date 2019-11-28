import dg from 'debug';

// Instruments
import {Lessons} from '../../../controllers';

const debug = dg('router:lessons:hash');

export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash } = req.params;

        const data = await lessons.getByHash(lessonHash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash } = req.params;

        const data = await lessons.updateByHash(lessonHash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash } = req.params;

        await lessons.deleteByHash(lessonHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
