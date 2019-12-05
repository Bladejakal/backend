// Core
import dg from 'debug';

// Instruments
import { Lessons } from '../../../../../controllers';

const debug = dg('router:lessons:keynotes:hash');

export const getKeynoteByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { lessonHash, keynoteHash } = req.params;
        const model = new Lessons({ hash: lessonHash, keynoteHash });
        const data = await model.getKeynote();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeKeynoteByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { lessonHash, keynoteHash } = req.params;
        const model = new Lessons({ hash: lessonHash, keynoteHash });
        await model.removeKeynote();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
