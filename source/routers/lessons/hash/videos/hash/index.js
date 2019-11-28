import dg from 'debug';

// Instruments
import {Lessons} from '../../../../../controllers';

const debug = dg('router:lessons:videos:hash');

export const getVideoByHash = async  (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash, videoHash } = req.params;
        const data = await lessons.getVideoByHash(lessonHash, videoHash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeVideoByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash, videoHash } = req.params;
        await lessons.removeVideoByHash(lessonHash, videoHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
