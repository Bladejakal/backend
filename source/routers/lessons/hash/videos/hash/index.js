// Core
import dg from 'debug';

// Instruments
import { Lessons } from '../../../../../controllers';

const debug = dg('router:lessons:videos:hash');

export const getVideoByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { lessonHash, videoHash } = req.params;
        const model = new Lessons({ hash: lessonHash, videoHash });
        const data = await model.getVideo();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeVideoByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { lessonHash, videoHash } = req.params;
        const model = new Lessons({ hash: lessonHash, videoHash });
        await model.removeVideo();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
