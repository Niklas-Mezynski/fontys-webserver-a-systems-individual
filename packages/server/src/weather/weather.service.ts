import { db } from '../db/db';
import { weatherData } from '../db/schema/weather.data';
import { WeatherInfo } from './weather.interfaces';
import axios from 'axios';
import { desc } from 'drizzle-orm/expressions';

interface QueryParams {
  lat: number;
  lon: number;
}

export class WeatherService {
  private static API_KEY = process.env.WEATHERAPI_COM_API_KEY;

  private static API_URL = process.env.WEATHERAPI_URL;

  private static async getCurrentWeatherData(params: QueryParams) {
    if (!this.API_URL) {
      throw new Error('API_URL is not defined');
    }
    if (!this.API_KEY) {
      throw new Error('API_KEY is not defined');
    }

    const response = await axios.get<WeatherInfo>(this.API_URL, {
      params: {
        q: `${params.lat},${params.lon}`,
        key: this.API_KEY,
      },
    });
    return response.data;
  }

  private static async insertCurrentWeatherDataToDB() {
    const data = await this.getCurrentWeatherData({
      lat: +process.env.LAT!,
      lon: +process.env.LON!,
    });

    const result = await db
      .insert(weatherData)
      .values({
        cloud: data.current.cloud,
        humidity: data.current.humidity,
        precipitation: data.current.precip_mm.toString(),
        pressure: data.current.pressure_mb.toString(),
        temperature: data.current.temp_c.toString(),
        uvIndex: data.current.uv.toString(),
        weatherMeasuredAt: new Date(data.current.last_updated + '+02:00'),
      })
      .returning();
    return result[0];
  }
  public static async getLatestWeatherData() {
    const latestWeatherData = await db
      .select()
      .from(weatherData)
      .orderBy(desc(weatherData.createdAt))
      .limit(1);

    if (
      latestWeatherData.length < 1 ||
      new Date().getTime() - latestWeatherData[0].createdAt.getTime() >
        +(process.env.MINUTES_BETWEEN_WEATHER_FETCH || 5) * 60 * 1000 // (One hour)
    ) {
      return WeatherService.insertCurrentWeatherDataToDB();
    }
    return latestWeatherData[0];
  }
}
