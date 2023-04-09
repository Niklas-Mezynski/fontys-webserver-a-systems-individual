import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';

export const sensorData = pgTable('sensor_data', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  rawValue: integer('raw_value').notNull(),
  humidity: numeric('humidity', {
    precision: 6,
    scale: 3,
  }).notNull(),
});
