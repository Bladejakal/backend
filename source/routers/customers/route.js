import dg from 'debug';

const debug = dg('router:customers');

// Instruments
import { Customers } from '../../controllers';

export const get = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const customers = new Customers(req.body);
        const data = await customers.get();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const customers = new Customers(req.body);
        const data = await customers.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
