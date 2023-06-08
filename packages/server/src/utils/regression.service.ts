import { PythonShell } from 'python-shell';
import { WeatherData, weatherData } from '../db/schema/weather.data';

export class RegressionService {
  private static pythonScriptPath = './model.script.py';

  public static async predictHumidityChange(
    inputData: WeatherData[]
  ): Promise<number[]> {
    const results = await PythonShell.run(RegressionService.pythonScriptPath, {
      args: [
        JSON.stringify(
          inputData.map((weatherData) => [
            Number(weatherData.precipitation),
            Number(weatherData.temperature),
            Number(weatherData.humidity),
            Number(weatherData.uvIndex),
          ])
        ),
      ],
    });

    return JSON.parse(results[0]);
  }
}
