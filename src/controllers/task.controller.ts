import { Request, Response } from 'express';
import { ExceptionHandler } from '../decorators/ExceptionHandler';
import { TaskService } from '../services.ts/task.service';

export class TaskController {

  constructor(private taskService: TaskService) {
    this.getTasks = this.getTasks.bind(this);
  }

  @ExceptionHandler()
  async getTasks(req: Request, res: Response) {
    const result = await this.taskService.getTasksById({ db: req.db });
    res.status(200).json({
      message: 'Fetched tasks with users',
      data: result.rows,
    });
  }
}