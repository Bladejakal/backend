import express from 'express';

import { post } from './handlers';

export const router = express.Router();

router.post('/', post);

export { router as logout };
