// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import {authenticate, validator} from '../../helpers';

export const router = express.Router();

// Schema
import {createProduct} from '../../schemas';

router.get('/', [], get);
router.post('/', [ authenticate('staff'), validator(createProduct) ], post);

router.get('/:hash', [], getByHash);
router.put('/:hash', [ authenticate('staff') ], updateByHash);
router.delete('/:hash', [ authenticate('staff') ], removeByHash);

export { router as products };
