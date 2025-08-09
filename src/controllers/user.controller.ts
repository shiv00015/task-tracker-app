import { Request, Response } from 'express';
import { Log } from '../decorators/Log';
import { ExceptionHandler } from '../decorators/ExceptionHandler';
import { UserService } from '../services.ts/user.service';


export class UserController {

    constructor(private userService: UserService) {
        this.getUser = this.getUser.bind(this)
        this.registerUser = this.registerUser.bind(this);
    }

    @ExceptionHandler()
    @Log()
    async getUser(req: Request, res: Response) {
        const user_id = Number(req.query.id);
        const result = await this.userService.getUserById({ id: user_id, db: req.db });
        res.status(200).json({
            message: 'Fetched tasks with users',
            data: result.rows,
        });
    }

    @ExceptionHandler()
    async registerUser(req: Request, res: Response) {
        await this.userService.createUser({ body: req.body, db: req.db })
        res.status(201).json({ message: 'User created' });
    }
}