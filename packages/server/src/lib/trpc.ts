import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const key = req.headers.authorization;

  return {
    request: req,
    authKey: key,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;
export const trpc = initTRPC.context<Context>().create();
