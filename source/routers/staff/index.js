// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { validator, authenticate } from '../../helpers';

export const router = express.Router();

// Schema
import { createStaff } from '../../schemas';

router.get('/', [ authenticate('staff') ], get);
router.post('/', [ validator(createStaff) ], post);

export { router as staff };
