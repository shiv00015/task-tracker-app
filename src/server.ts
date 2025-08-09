import express from 'express';
import { attachDb } from './middleware/db/attachDb';
import userRoute from './routes/user.route';
import taskRoute from './routes/task.route';

const app = express();
app.use(express.json());
app.use(attachDb);

app.use('/user', userRoute);

app.get('/tasks', taskRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
