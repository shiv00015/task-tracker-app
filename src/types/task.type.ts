import { Pool, PoolClient } from "pg"

type tasks = {
    db: Pool | PoolClient;
}

export default tasks;