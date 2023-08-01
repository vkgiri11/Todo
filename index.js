import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';

import userRoutes from "./routes/userRoutes.js"
import taskRoutes from './routes/taskRoutes.js';

const app = express();
dotenv.config();

connectDB();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
