import express from 'express';
import { attachDb } from './middleware/db/attachDb';
import { UserController } from './controller/UserController';
import { TaskController } from './controller/TaskController';

const app = express();
app.use(express.json());
app.use(attachDb);

const userController = new UserController();

const taskController = new TaskController();

app.get('/getuser', userController.getUser.bind(userController));

app.post('/users', userController.registerUser.bind(userController));

app.get('/created_tasks', taskController.getUserTasks.bind(taskController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
