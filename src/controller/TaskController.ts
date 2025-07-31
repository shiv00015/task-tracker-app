import { Request, Response } from 'express';
import { ExceptionHandler } from '../decorators/exception';

export class TaskController {

    @ExceptionHandler()
    async getUserTasks(req: Request, res: Response) {
        const result = await req.db.query(`
            SELECT 
              "Task".idu AS task_id,
              "Task".title,
              "Task"."createdAt" AS task_created_at,
              "User".id AS user_id,
              "User".email,
              "User"."createdAt" AS user_created_at
            FROM "Task"
            JOIN "User" ON "Task"."ownerId" = "User".id;
          `);

        res.status(200).json({
            message: 'Fetched tasks with users',
            data: result.rows,
        });
    }
}