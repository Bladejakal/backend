// Core
import dg from 'debug';

// Instruments
import { Lessons } from '../../../../controllers';

const debug = dg('router:lessons:keynotes');

export const addKeynote = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { lessonHash } = req.params;
        const model = new Lessons({ hash: lessonHash, payload: req.body });
        const data = await model.addKeynote();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
