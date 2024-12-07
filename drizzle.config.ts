import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';

export default defineConfig({
  driver: 'mysql2',
  dbCredentials: {
    host: String(process.env.DB_HOST) || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: String(process.env.DB_NAME) || 'project',
  },
  schema: './src/server/db/drizzle/schema.ts',
  out: './src/server/db/drizzle',
  introspect: {
    casing: 'camel',
  },
}) satisfies Config;
