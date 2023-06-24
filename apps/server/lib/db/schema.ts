import {integer, jsonb, pgTable, serial} from "drizzle-orm/pg-core";
import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";
import {InferModel} from "drizzle-orm";

export const sumLogs = pgTable('sum_logs', {
  id: serial('id').primaryKey(),
  first_number: integer('first_number').notNull(),
  second_number: integer('second_number').notNull(),
  steps: jsonb('steps').notNull().default('{}'),
});

export type SumLog = InferModel<typeof sumLogs>

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

export { db }
