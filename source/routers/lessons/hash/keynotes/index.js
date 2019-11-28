import dg from 'debug';

const debug = dg('router:lessons:keynotes');

// Instruments
import {Lessons} from '../../../../controllers';

export const addKeynote = async(req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash } = req.params;
        const data = await lessons.addKeynote(lessonHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
