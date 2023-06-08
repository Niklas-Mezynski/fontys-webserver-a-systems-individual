import { WeatherData, weatherData } from '../db/schema/weather.data';

export class RegressionService {
  private static pythonScriptPath = './model.script.py';

  private static coefficients: number[] = [
    0.50337581, -0.01352782, 0.00210345, -0.04221809,
  ];

  private static intercept: number = -0.04100118115724671;

  public static async predictHumidityChange(
    inputData: WeatherData[]
  ): Promise<number[]> {
    const inputVectors = inputData.map((weatherData) => [
      Number(weatherData.precipitation),
      Number(weatherData.temperature),
      Number(weatherData.humidity),
      Number(weatherData.uvIndex),
    ]);

    const predictionVector = inputVectors.map((inputVector, index) => {
      let prediction = RegressionService.intercept;
      for (let i = 0; i < inputVector.length; i++) {
        prediction += inputVector[i] * RegressionService.coefficients[i];
      }

      return prediction;
    });

    return predictionVector;
  }
}
