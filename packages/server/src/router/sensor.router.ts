import { desc } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { db } from '../db/db';
import { sensorData } from '../db/schema/sensor.data';
import { weatherData } from '../db/schema/weather.data';
import { trpc } from '../lib/trpc';
import { verifyToken } from '../utils';
import { WeatherService } from '../weather/weather.service';

export const sensorRouter = trpc.router({
  getSensorData: trpc.procedure
    .input(
      z
        .object({
          limit: z.number().int().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const query = db
        .select()
        .from(sensorData)
        .orderBy(desc(sensorData.createdAt));
      if (input?.limit) {
        query.limit(input.limit);
      }

      const result = await query;
      return result.map((item) => ({
        ...item,
        humidity: +item.humidity,
      }));
    }),
  addSensorData: trpc.procedure
    .input(
      z.object({
        rawValue: z.number(),
        humidity: z.number().lte(999.999).gte(-999.999),
        sensorType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      verifyToken(ctx.authKey);

      const sensorType = input.sensorType.toUpperCase();

      // For each insert (on main Sensor), also save the current weather data
      if (sensorType === 'MAIN') {
        await WeatherService.insertCurrentWeatherDataToDB();
      }

      return db
        .insert(sensorData)
        .values({
          rawValue: input.rawValue,
          humidity: String(input.humidity),
          sensorType: sensorType,
        })
        .returning();
    }),
});
