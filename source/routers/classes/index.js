// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import { enroll, expel } from './education';
import { authenticate } from '../../utils';

export const router = express.Router();

router.get('/', get);
router.post('/', [ authenticate ], post);

router.get('/:classHash', [ authenticate ], getByHash);
router.put('/:classHash', [ authenticate ], updateByHash);
router.delete('/:classHash', [ authenticate ], removeByHash);

router.post('/:classHash/enroll', [ authenticate ], enroll);
router.post('/:classHash/expel', [ authenticate ], expel);

export { router as classes };
