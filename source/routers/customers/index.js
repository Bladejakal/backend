// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import { authenticate, validator } from '../../helpers';

export const router = express.Router();

// Schema
import { createCustomer } from '../../schemas';

router.get('/', [ authenticate('staff') ], get);
router.post('/', [ validator(createCustomer) ], post);

router.get('/:hash', [ authenticate('customers', true) ], getByHash);
router.put('/:hash', [ authenticate('customers', true) ], updateByHash);
router.delete('/:hash', [ authenticate('customers', true) ], removeByHash);

export { router as customers };
