import { Pool, PoolClient } from "pg";

type createUser = {
    email: string,
    password: string
}

export type userPayload = {
    db?: Pool | PoolClient;
    body?: createUser,
    id?: number,
}

export default createUser;