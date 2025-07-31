import { Request, Response } from 'express';
import { Log } from '../decorators/Log';
import { ExceptionHandler } from '../decorators/exception';


export class UserController {

    @ExceptionHandler()
    @Log()
    async getUser(req: Request, res: Response) {
        const user_id = req.query.id;

        if (Number(user_id) > 3) {
            throw new Error('ID not found');
        }

        const result = await req.db.query(
            `select * from "User" where id=${user_id}`
        );
        res.status(200).json({
            message: 'Fetched tasks with users',
            data: result.rows,
        });
    }

    @ExceptionHandler()
    async registerUser(req: Request, res: Response) {
        const { email, password } = req.body;

        await req.db.query(
            'INSERT INTO "User" (email, password, "createdAt", "updatedAt") VALUES ($1, $2, NOW(), NOW())',
            [email, password]
        );

        res.status(201).json({ message: 'User created' });
    }
}