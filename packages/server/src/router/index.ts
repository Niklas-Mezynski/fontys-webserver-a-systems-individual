import { trpc } from '../lib/trpc';
import { sensorRouter } from './sensorRouter';
import { todoRouter } from './todoRouter';

export const appRouter = trpc.router({
  todo: todoRouter,
  sensors: sensorRouter,
});

export type AppRouter = typeof appRouter;
