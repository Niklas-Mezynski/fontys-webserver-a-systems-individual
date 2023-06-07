require('dotenv').config({
  path: __dirname + '/../.env',
});
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express, { Application } from 'express';
import { createContext } from './lib/trpc';
import { appRouter } from './router';
import { env } from './utils/env.parser';
// import { TensorflowService } from './utils/tensorflow.service';

// TensorflowService.predict([1, 2, 3, 4]);

const app: Application = express();
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  })
);

const PORT: number = env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
