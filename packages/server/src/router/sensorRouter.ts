import { trpc } from '../lib/trpc';
import { z } from 'zod';
import { db } from '../db/db';
import { sensorData } from '../db/schema/sensor.data';

export const sensorRouter = trpc.router({
  getSensorData: trpc.procedure.query(async ({ ctx }) => {
    // console.log(ctx.user);
    const data = await db.select().from(sensorData);
    return data;
  }),
  addSensorData: trpc.procedure
    .input(z.object({ rawValue: z.number(), humidity: z.number() }))
    .mutation(({ input }) => {
      // const title = input.title;
      return { id: '3', title: 'Snens', isCompleted: true };
    }),
});
