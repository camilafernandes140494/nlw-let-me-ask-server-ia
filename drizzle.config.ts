import { defineConfig } from 'drizzle-kit';
import { env } from './src/env.ts';

export default defineConfig({
  schema: './src/db/schema/**.ts',
  dialect: 'postgresql',
  out: './src/db/schema/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: 'snake_case',
  verbose: true,
});
