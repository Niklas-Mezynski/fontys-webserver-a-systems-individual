import { z } from 'zod';
import { trpc } from '../lib/trpc';
import { WeatherService } from '../weather/weather.service';

export const weatherRouter = trpc.router({
  getWeatherData: trpc.procedure
    .input(
      z.object({
        lat: z.number(),
        lon: z.number(),
      })
    )
    .query(async ({ input }) => {
      return WeatherService.getCurrentWeatherData(input);
    }),
});
