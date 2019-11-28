import dg from 'debug';

import {Lessons} from '../../../../../controllers';

const debug = dg('router:lessons:keynotes:hash');

export const getKeynoteByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash, keynoteHash } = req.params;
        const data = await lessons.getKeynoteByHash(lessonHash, keynoteHash);

        res.status(200).json(data || {});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeKeynoteByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const lessons = new Lessons(req.body);
        const { lessonHash, keynoteHash } = req.params;
        await lessons.removeKeynoteByHash(lessonHash, keynoteHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
