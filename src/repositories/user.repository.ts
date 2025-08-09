import { Pool } from "pg";
import createUser, { userPayload } from "../types/user.type";

export class UserRepository {

    constructor() { }

    async insertUser(args: userPayload) {
        const { email, password } = args.body as createUser;
        const { db } = args as userPayload;

        if (!db)
            throw new Error('ID not found');

        await db.query(
            'INSERT INTO "User" (email, password, "createdAt", "updatedAt") VALUES ($1, $2, NOW(), NOW())',
            [email, password]
        );

        return 'user created';
    }

    async findById(args: userPayload) {
        const { id, db } = args;

        if (!db)
            throw new Error('ID not found');

        const res = await db.query(
            `select * from "User" where id=${id}`
        );
        return res;
    }
}