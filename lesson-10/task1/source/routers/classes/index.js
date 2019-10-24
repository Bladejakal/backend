// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import { enroll, expel } from './education';
import { auth } from './../../utils';

export const router = express.Router();

router.get('/', get);
router.post('/', [ auth() ], post);

router.get('/:classHash', [ auth() ], getByHash);
router.put('/:classHash', [ auth() ], updateByHash);
router.delete('/:classHash', [ auth() ], removeByHash);

router.post('/:classHash/enroll', [ auth() ], enroll);
router.post('/:classHash/expel', [ auth() ], expel);

export { router as classes };
