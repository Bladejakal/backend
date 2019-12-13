import dg from 'debug';

// Instruments
import { Orders } from '../../../controllers';

const debug = dg('router:orders:hash');

export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const orders = new Orders(req.body);
        const { hash } = req.params;

        const data = await orders.getByHash(hash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const orders = new Orders(req.body);
        const { hash } = req.params;

        const data = await orders.updateByHash(hash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const orders = new Orders(req.body);
        const { hash } = req.params;

        await orders.deleteByHash(hash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

