import express from 'express';
import api from './router.js';

const router = express.Router();

router.use('/api', api);

export default router;
