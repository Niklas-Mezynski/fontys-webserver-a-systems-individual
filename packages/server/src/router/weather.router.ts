import { z } from 'zod';
import { trpc } from '../lib/trpc';
import { WeatherService } from '../weather/weather.service';
import { db } from '../db/db';
import { weatherData } from '../db/schema/weather.data';
import { desc } from 'drizzle-orm/expressions';
import { TRPCError } from '@trpc/server';

export const weatherRouter = trpc.router({
  getWeatherData: trpc.procedure.query(async () => {
    const latestWeatherData = await db
      .select()
      .from(weatherData)
      .orderBy(desc(weatherData.createdAt))
      .limit(1);

    if (
      !latestWeatherData.length ||
      new Date().getTime() - latestWeatherData[0].createdAt.getTime() > 3600000 // (One hour)
    ) {
      return WeatherService.insertCurrentWeatherDataToDB();
    }
    return latestWeatherData[0];
  }),
});
