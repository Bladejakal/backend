// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import { addKeynote } from './hash/keynotes';
import { getKeynoteByHash, removeKeynoteByHash } from './hash/keynotes/hash';
import { getVideoByHash, removeVideoByHash } from './hash/videos/hash';
import { addVideo } from './hash/videos';
import { auth } from './../../utils';


export const router = express.Router();

router.get('/', get);
router.post('/', [ auth() ], post);

router.get('/:lessonHash', [ auth() ], getByHash);
router.put('/:lessonHash', [ auth() ], updateByHash);
router.delete('/:lessonHash', [ auth() ], removeByHash);

router.post('/:lessonHash/videos', [ auth() ], addVideo);
router.post('/:lessonHash/keynotes', [ auth() ], addKeynote);

router.get('/:lessonHash/videos/:videoHash', [ auth() ], getVideoByHash);
router.delete('/:lessonHash/videos/:videoHash', [ auth() ], removeVideoByHash);

router.get('/:lessonHash/keynotes/:keynoteHash', [ auth() ], getKeynoteByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', [ auth() ], removeKeynoteByHash);

export { router as lessons };
