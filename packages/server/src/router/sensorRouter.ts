import { trpc } from "../lib/trpc";
import { z } from "zod";
import { db } from "../db/db";
import { sensorData } from "../db/schema/sensor.data";

export const sensorRouter = trpc.router({
  getSensorData: trpc.procedure.query(async ({ ctx }) => {
    // console.log(ctx.user);
    const data = await db.select().from(sensorData);
    return data;
  }),
});
