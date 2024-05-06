import express from 'express';
const router = express.Router();
import { generateIdCard } from '../controllers/students.js';

router.get('/generateIdCard', generateIdCard);

export default router;