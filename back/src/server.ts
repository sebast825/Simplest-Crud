import express from 'express';
import {authRoutes} from './routes/authRoutes';
import {healthRoutes} from './routes/healthRoutes';
import {taskRoutes} from './routes/taskRoutes';
import {userRoutes} from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']

}));


app.use('/api', healthRoutes);
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', userRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
