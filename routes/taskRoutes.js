import express from 'express';

import authMiddleware from '../middleware/authMiddleWare.js';
import { getAllTasks, createTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/:userId', authMiddleware, getAllTasks);
router.post('/', authMiddleware, createTask);
// router.put('/', updateTask);

export default router;
