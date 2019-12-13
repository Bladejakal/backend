import dg from 'debug';

const debug = dg('router:orders');

// Instruments
import { Orders } from '../../controllers';

export const get = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const orders = new Orders(req.body);
        const data = await orders.get();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const orders = new Orders(req.body);
        const data = await orders.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
