import { db } from '../db/db';
import { weatherData } from '../db/schema/weather.data';
import { WeatherInfo } from './weather.interfaces';
import axios from 'axios';

interface QueryParams {
  lat: number;
  lon: number;
}

export class WeatherService {
  private static API_KEY = process.env.WEATHERAPI_COM_API_KEY;

  private static API_URL = process.env.WEATHERAPI_URL;

  public static async getCurrentWeatherData(params: QueryParams) {
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

  public static async insertCurrentWeatherDataToDB() {
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
        weatherMeasuredAt: new Date(data.current.last_updated),
      })
      .returning();
    return result[0];
  }
}
