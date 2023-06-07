import { z } from 'zod';

const envVars = z.object({
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.string(),
  AUTH_TOKEN: z.string(),
  WEATHERAPI_COM_API_KEY: z.string(),
  WEATHERAPI_URL: z.string(),
  LAT: z.coerce.number(),
  LON: z.coerce.number(),
  MINUTES_BETWEEN_WEATHER_FETCH: z.coerce.number().int().positive(),
});

export const env = envVars.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
