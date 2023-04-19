import { TRPCError } from '@trpc/server';
import { env } from './utils/env.parser';

const authToken = env.AUTH_TOKEN;

export function verifyToken(token?: string) {
  if (token !== authToken) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized',
    });
  }
}
