import dg from 'debug';

const debug = dg('router:lessons:videos');

// Instruments
import {Lessons} from '../../../../controllers';

export const addVideo = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash } = req.params;
        const data = await lessons.addVideo(lessonHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
