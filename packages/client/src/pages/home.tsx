import { inferAsyncReturnType } from '@trpc/server';
import SensorLineChart from '../components/SensorLineChart';
import WeatherInfo from '../components/WeatherInfo';
import { trpc } from '../lib/trpc';

export default function Home() {
  //   type argus = inferAsyncReturnType<typeof trpc.sensors.getSensorData.useQuery>;
  const response = trpc.sensors.getSensorData.useQuery(
    { limit: 30 },
    { retry: 3 }
  );
  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="text-center text-3xl font-bold text-gray-700 my-4 lg:my-8">
        <h1>Sensor data monitoring</h1>
      </div>
      <SensorLineChart
        dataAttribute="humidity"
        label="Humidity"
        strokeColor="#845EC2"
      />
      <SensorLineChart
        dataAttribute="rawValue"
        label="Raw moisture value"
        strokeColor="#FF6F91"
      />
      <WeatherInfo />
    </div>
  );
}
