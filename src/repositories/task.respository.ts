import { Pool } from "pg";
import tasks from "../types/task.type";

export class TaskRepository {

  constructor() { }

  async findById(args: tasks) {

    const { db } = args;
    if (!db)
      throw new Error('ID not found');

    const result = await db.query(`
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

    return result;
  }
}