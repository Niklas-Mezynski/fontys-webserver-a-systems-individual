import { trpc } from '../lib/trpc';
import { sensorRouter } from './sensor.router';
import { weatherRouter } from './weather.router';

export const appRouter = trpc.router({
  sensors: sensorRouter,
  weather: weatherRouter,
});

export type AppRouter = typeof appRouter;
