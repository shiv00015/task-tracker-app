import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class PostgresSingleton {
  private static instance: Pool;

  private constructor() { }

  public static getInstance(): Pool {
    if (!PostgresSingleton.instance) {
      console.log('🌀 Initializing PostgreSQL Pool...');
      PostgresSingleton.instance = new Pool({
        connectionString: process.env.DATABASE_URL,
      });

      // Log query time
      PostgresSingleton.instance.on('connect', (client) => {
        console.log('🔌 New DB client connected');
      });

      PostgresSingleton.instance.on('acquire', () => {
        console.log('📥 DB client acquired from pool');
      });

      PostgresSingleton.instance.on('remove', () => {
        console.log('🧹 DB client removed from pool');
      });

      // Optional: override query to track duration
    }

    return PostgresSingleton.instance;
  }
}

export default PostgresSingleton;
