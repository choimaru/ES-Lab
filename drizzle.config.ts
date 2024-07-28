import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql',
  schema: './src/server/db/drizzle/schema.ts',
  out: './src/server/db/drizzle',
  dbCredentials: {
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    host: String(process.env.DB_HOST) || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    database: String(process.env.DB_NAME) || 'project',
  },
  introspect: {
    casing: 'camel',
  },
}) satisfies Config;
