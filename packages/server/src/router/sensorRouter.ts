import { desc } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { db } from '../db/db';
import { sensorData } from '../db/schema/sensor.data';
import { trpc } from '../lib/trpc';

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
      return Promise.reject('Argus');
      return query;
    }),
  addSensorData: trpc.procedure
    .input(
      z.object({
        rawValue: z.number().int(),
        humidity: z.number().lte(999.999).gte(-999.999),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: validate authentication
      return db
        .insert(sensorData)
        .values({
          rawValue: input.rawValue,
          humidity: String(input.humidity),
        })
        .returning();
    }),
});
