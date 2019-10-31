// Core
import express from 'express';

// Instruments
import { login } from './route';
import {limiter} from "../../utils";

export const router = express.Router();

router.post('/login', [ limiter(5, 60 * 1000) ], login);

export { router as api };
