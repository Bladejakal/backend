import dg from 'debug';

// Instruments
import { Products } from '../../../controllers';

const debug = dg('router:products:hash');

export const getByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const products = new Products(req.body);
        const { hash } = req.params;

        const data = await products.getByHash(hash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const products = new Products(req.body);
        const { hash } = req.params;

        const data = await products.updateByHash(hash);

        res.status(200).json(data || {});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const products = new Products(req.body);
        const { hash } = req.params;

        await products.deleteByHash(hash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

