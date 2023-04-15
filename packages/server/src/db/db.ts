import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: DB_URL,
});

export const db = drizzle(pool);
migrate(db, {
  migrationsFolder: __dirname + '/../../migrations-folder',
});
