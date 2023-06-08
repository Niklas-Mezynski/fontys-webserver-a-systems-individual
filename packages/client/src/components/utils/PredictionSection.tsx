import { trpc } from '../../lib/trpc';
import DataError from './Error';
import DataLoading from './Loading';

export default function PredictionSection() {
  const predictionResponse = trpc.sensors.getHumidityPrediction.useQuery(
    { sensorTypes: ['FIRST'] },
    { retry: false }
  );

  if (predictionResponse.isLoading) {
    return <DataLoading />;
  }

  if (predictionResponse.isError) {
    return (
      <DataError
        message="Error while loading sensor data"
        details={predictionResponse.error?.message}
      />
    );
  }

  const avgPrediction = predictionResponse.data?.timeUntilWatering || 0;
  let predString = `${avgPrediction.toFixed(2)} hours ${
    avgPrediction < 0 ? 'ago' : ''
  }`;
  if (avgPrediction === -187420) {
    predString = 'N/A';
  }

  return (
    <div className="text-lg text-center ">
      <p className="text-lg text-center text-gray-700">
        Prediction: {predictionResponse.data?.avgPrediction.toFixed(2)}%
      </p>
      <p className="text-lg text-center text-gray-700">
        Time until next watering: {predString}
      </p>
    </div>
  );
}
