import { Request, Response, NextFunction } from 'express';
import pool from './pool';

export const attachDb =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const client = await pool.connect();
    req.db = client;

    res.on('finish', () => client.release()); // important!
    next();
  };
