import { Router } from 'express';
import { TaskRepository } from '../repositories/task.respository';
import { TaskService } from '../services.ts/task.service';
import { TaskController } from '../controllers/task.controller';

const taskRoute = Router();

const testRepository = new TaskRepository();
const taskService = new TaskService(testRepository);
const taskController = new TaskController(taskService);

taskRoute.get('/getTasks', taskController.getTasks);

export default taskRoute;