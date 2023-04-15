import {
  index,
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';

export const weatherData = pgTable(
  'weather_data',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    weatherMeasuredAt: timestamp('weather_measured_at').notNull(),
    temperature: numeric('temperature_c', {
      precision: 4,
      scale: 1,
    }).notNull(),
    precipitation: numeric('precipitation_mm', {
      precision: 6,
      scale: 1,
    }).notNull(),
    uvIndex: numeric('uv_index', {
      precision: 4,
      scale: 1,
    }).notNull(),
    pressure: numeric('pressure_mbar', {
      precision: 6,
      scale: 2,
    }).notNull(),
    humidity: integer('humidity').notNull(),
    cloud: integer('cloud').notNull(),
  },
  (sensorData) => ({
    createdAtIndex: index('weather_data_created_at_index').on(
      sensorData.createdAt
    ),
  })
);
