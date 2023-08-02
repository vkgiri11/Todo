import express from 'express';

import authMiddleware from '../middleware/authMiddleWare.js';
import { createTask } from '../controllers/taskController.js';

const router = express.Router();

// router.get('/', authMiddleware, getAllTasks);
router.post('/', authMiddleware, createTask);
// router.put('/', updateTask);

export default router;
