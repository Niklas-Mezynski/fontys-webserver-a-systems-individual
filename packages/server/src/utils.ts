import { TRPCError } from '@trpc/server';

const authToken = process.env.AUTH_TOKEN;

export function verifyToken(token?: string) {
  if (token !== authToken) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized',
    });
  }
}
