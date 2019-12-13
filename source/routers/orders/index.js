// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import {authenticate, validator} from '../../helpers';

export const router = express.Router();

// Schema
import {createOrder} from '../../schemas';

router.get('/', [ authenticate() ], get);
router.post('/', [ authenticate(), validator(createOrder) ], post);

router.get('/:hash', [ authenticate() ], getByHash);
router.put('/:hash', [ authenticate() ], updateByHash);
router.delete('/:hash', [ authenticate() ], removeByHash);

export { router as orders };
