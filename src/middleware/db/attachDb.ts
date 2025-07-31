import { Request, Response, NextFunction } from 'express';
import PostgresSingleton from './PostgresSingleton';

export const attachDb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = PostgresSingleton.getInstance();

    const client = await pool.connect();

    req.db = client;

    await client.query('BEGIN');

    res.on('finish', async () => {
      try {
        await client.query('COMMIT');
        console.log('connection released')
        client.release();
      } catch (err) {
        console.error('Commit failed:', err);
      }
    });

    res.on('close', async () => {
      if (!res.writableEnded) {
        try {
          await client.query('ROLLBACK');
          console.log('connection clossed')
          client.release();
        } catch (err) {
          console.error('Rollback failed:', err);
        }
      }
    });

    next();
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};