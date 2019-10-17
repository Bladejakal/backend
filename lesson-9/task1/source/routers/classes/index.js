import express from 'express';

import {get, post} from './handlers';
import {getByHash, putByHash, deleteByHash} from './hash';
import {postEnroll} from './hash/enroll';
import {postExpel} from './hash/expel';

export const router = express.Router();

router.get('/', get);
router.post('/', post);

router.get('/:classHash', getByHash);
router.put('/:classHash', putByHash);
router.delete('/:classHash', deleteByHash);

router.post('/:classHash/enroll', postEnroll);
router.post('/:classHash/expel', postExpel);

export {router as classes};
