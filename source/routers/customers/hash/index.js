import dg from 'debug';

// Instruments
import { Customers } from '../../../controllers';

const debug = dg('router:customers:hash');

export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const customers = new Customers(req.body);
        const { hash } = req.params;

        const data = await customers.getByHash(hash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const customers = new Customers(req.body);
        const { hash } = req.params;

        const data = await customers.updateByHash(hash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const customers = new Customers(req.body);
        const { hash } = req.params;

        await customers.deleteByHash(hash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

