import express from 'express';

// import authMiddleware from '../middleware/authMiddleWare.js';
import { getAllTasks } from '../controllers/taskController';

const router = express.Router();

router.get('/', getAllTasks);
// router.post('/', createTask);
// router.put('/', updateTask);

export default router;
