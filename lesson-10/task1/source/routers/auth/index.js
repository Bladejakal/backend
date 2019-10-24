// Core
import express from 'express';

// Instruments
import { login, logout } from './route';
import { limiter, auth } from '../../utils';

export const router = express.Router();

router.post('/login', [ limiter(5, 60 * 1000) ], login);
router.post('/logout', [ limiter(5, 60 * 1000), auth() ], logout);

export { router as auth };
