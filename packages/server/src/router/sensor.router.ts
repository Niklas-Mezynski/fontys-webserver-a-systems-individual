import { sql } from 'drizzle-orm';
import { desc, eq } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { db } from '../db/db';
import { SensorData, sensorData } from '../db/schema/sensor.data';
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
          sensorType: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const query = db
        .select({
          id: sensorData.id,
          createdAt: sensorData.createdAt,
          rawValue: sensorData.rawValue,
          humidity: sensorData.humidity,
          sensorType: sensorData.sensorType,
          weather: weatherData,
        })
        .from(sensorData)
        .leftJoin(weatherData, eq(weatherData.id, sensorData.weatherId))
        .orderBy(desc(sensorData.createdAt));
      if (input?.limit) {
        query.limit(input.limit);
      }
      if (input?.sensorType) {
        query.where(eq(sensorData.sensorType, ''));
      }

      const result = await query;
      return result.map((item) => ({
        ...item,
        humidity: +item.humidity,
      }));
    }),
  getSensorDataAveraged: trpc.procedure
    .input(
      z
        .object({
          limit: z.number().int().optional(),
          sensorType: z.string().optional(),
          skip: z.number().int().default(12),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const sensorTypes = await db
        .select({
          sensorType: sql<
            SensorData['sensorType']
          >`DISTINCT sensor_type as "sensorType"`,
        })
        .from(sensorData);

      return await Promise.all(
        sensorTypes.map(async (sensorType) => {
          const res = await db.execute<{
            id: SensorData['id'];
            createdAt: SensorData['createdAt'];
            humidity: SensorData['humidity'];
            sensorType: SensorData['sensorType'];
          }>(sql`SELECT id, created_at as "createdAt", sensor_type as "sensorType", rolling_avg as "humidity"
              FROM (SELECT *, 
                          AVG(humidity) OVER (ORDER BY created_at ROWS BETWEEN 4 PRECEDING AND CURRENT ROW) AS rolling_avg,
                          ROW_NUMBER() OVER (ORDER BY created_at DESC)                                      AS row_num
                    FROM sensor_data) sub
              WHERE row_num % 12 = 0
              ORDER BY created_at DESC
              LIMIT ${input?.limit || 'null'}`);

          return {
            sensor: sensorType,
            data: res.rows.map((item) => ({
              ...item,
              humidity: +item.humidity,
            })),
          };
        })
      );
    }),
  addSensorData: trpc.procedure
    .input(
      z.object({
        rawValue: z.number().int(),
        humidity: z.number().lte(999.999).gte(-999.999),
        sensorType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      verifyToken(ctx.authKey);

      const sensorType = input.sensorType.toUpperCase();

      // For each insert (on main Sensor), also save the current weather data
      const weatherId = (await WeatherService.getLatestWeatherData())?.id;

      return db
        .insert(sensorData)
        .values({
          rawValue: input.rawValue,
          humidity: String(input.humidity),
          sensorType: sensorType,
          weatherId: weatherId,
        })
        .returning();
    }),
});
