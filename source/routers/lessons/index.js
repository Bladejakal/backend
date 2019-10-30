// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash';
import { addKeynote } from './hash/keynotes';
import { getKeynoteByHash, removeKeynoteByHash } from './hash/keynotes/hash';
import { getVideoByHash, removeVideoByHash } from './hash/videos/hash';
import { addVideo } from './hash/videos';
import { authenticate } from '../../utils';

export const router = express.Router();

router.get('/', get);
router.post('/', [ authenticate ], post);

router.get('/:lessonHash', [ authenticate ], getByHash);
router.put('/:lessonHash', [ authenticate ], updateByHash);
router.delete('/:lessonHash', [ authenticate ], removeByHash);

router.post('/:lessonHash/videos', [ authenticate ], addVideo);
router.post('/:lessonHash/keynotes', [ authenticate ], addKeynote);

router.get('/:lessonHash/videos/:videoHash', [ authenticate ], getVideoByHash);
router.delete('/:lessonHash/videos/:videoHash', [ authenticate ], removeVideoByHash);

router.get('/:lessonHash/keynotes/:keynoteHash', [ authenticate ], getKeynoteByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', [ authenticate ], removeKeynoteByHash);

export { router as lessons };
