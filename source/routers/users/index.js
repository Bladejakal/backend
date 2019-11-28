// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import { limiter, validator, authenticate } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();

// router.get('/', [ authenticate, limiter(5, 60 * 1000) ], get);
router.get('/', [  limiter(5, 60 * 1000) ], get);
// router.post('/', [ validator(createUser) ], post);
router.post('/', [ ], post);

// router.get('/:userHash', [ authenticate ], getByHash);
// router.put('/:userHash', [ authenticate ], updateByHash);
// router.delete('/:userHash', [ authenticate ], removeByHash);

router.get('/:userHash', [  ], getByHash);
router.put('/:userHash', [  ], updateByHash);
router.delete('/:userHash', [  ], removeByHash);

export { router as users };
