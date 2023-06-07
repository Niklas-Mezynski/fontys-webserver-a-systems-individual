import { trpc } from '../lib/trpc';
import { WeatherService } from '../weather/weather.service';

export const weatherRouter = trpc.router({
  getWeatherData: trpc.procedure.query(() => {
    return WeatherService.getLatestWeatherData();
  }),
});
