import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const sensorData = pgTable("sensor_data", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  //   countryId: integer("country_id").references(() => countries.id),
});
