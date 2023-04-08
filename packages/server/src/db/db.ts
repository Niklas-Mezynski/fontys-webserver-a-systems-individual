import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const DB_URL = process.env.DATABASE_URL;
console.log(DB_URL);

const pool = new Pool({
  connectionString:
    DB_URL || "postgres://postgres:123456789@localhost:5187/postgres",
});
// or
// const pool = new Pool({
//   host: "127.0.0.1",
//   port: 5432,
//   user: "postgres",
//   password: "password",
//   database: "db_name",
// });

export const db = drizzle(pool);
