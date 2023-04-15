import {
  index,
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const sensorData = pgTable(
  'sensor_data',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    rawValue: integer('raw_value').notNull(),
    humidity: numeric('humidity', {
      precision: 6,
      scale: 3,
    }).notNull(),
    sensorType: varchar('sensor_type', {
      length: 128,
    })
      .notNull()
      .default('unknown'),
  },
  (sensorData) => ({
    createdAtIndex: index('created_at_index').on(sensorData.createdAt),
  })
);
