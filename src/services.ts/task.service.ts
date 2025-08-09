import { TaskRepository } from "../repositories/task.respository";
import tasks from "../types/task.type";

export class TaskService {
    constructor(private taskRepository: TaskRepository) { }

    async getTasksById(args: tasks) {
        const res = await this.taskRepository.findById(args);
        return res;
    }
}