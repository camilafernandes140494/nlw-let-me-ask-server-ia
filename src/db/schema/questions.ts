/** biome-ignore-all lint/style/useTrimStartEnd: <explanation> */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { rooms } from './rooms.ts';

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  questions: text().notNull(),
  answer: text(),
  createdAt: timestamp().notNull().defaultNow(),
});
