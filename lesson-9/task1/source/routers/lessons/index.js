import express from 'express';

import {get, post} from './handlers';
import {getByHash, putByHash, deleteByHash} from './hash';
import {postVideos} from './hash/videos';
import {postKeynotes} from './hash/keynotes';
import {getKeynoteByHash, deleteKeynoteByHash} from './hash/keynotes/hash';
import {getVideoByHash, deleteVideoByHash} from './hash/videos/hash';


export const router = express.Router();

router.get('/', get);
router.post('/', post);

router.get('/:lessonHash', getByHash);
router.put('/:lessonHash', putByHash);
router.delete('/:lessonHash', deleteByHash);

router.post('/:lessonHash/videos', postVideos);
router.post('/:lessonHash/keynotes', postKeynotes);

router.get('/:lessonHash/keynotes/:keynoteHash', getKeynoteByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', deleteKeynoteByHash);

router.get('/:lessonHash/videos/:videoHash', getKeynoteByHash);
router.delete('/:lessonHash/videos/:videoHash', deleteKeynoteByHash);

export {router as lessons};
