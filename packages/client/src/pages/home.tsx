import { inferAsyncReturnType } from '@trpc/server';
import SensorLineChart from '../components/SensorLineChart';
import WeatherInfo from '../components/WeatherInfo';
import { trpc } from '../lib/trpc';
import DataError from '../components/utils/Error';
import DataLoading from '../components/utils/Loading';

export default function Home() {
  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="text-center text-3xl font-bold text-gray-700 my-4 lg:my-8">
        <h1>Sensor data monitoring</h1>
      </div>
      <SensorSection />
      <WeatherInfo />
    </div>
  );
}

function SensorSection() {
  //   type argus = inferAsyncReturnType<typeof trpc.sensors.getSensorData.useQuery>;
  const sensorResponse = trpc.sensors.getSensorData.useQuery(
    { limit: 30 },
    { retry: false, refetchInterval: 30000 }
  );

  if (sensorResponse.isLoading) {
    return <DataLoading />;
  }

  if (sensorResponse.isError) {
    return (
      <DataError
        message="Error while loading sensor data"
        details={sensorResponse.error.message}
      />
    );
  }

  const data = sensorResponse
    .data!.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const humidityData = data.map((item) => ({
    date: new Date(item.createdAt),
    value: item.humidity,
  }));

  const rawValueData = data.map((item) => ({
    date: new Date(item.createdAt),
    value: item.rawValue,
  }));

  return (
    <>
      <span className="my-2">{`Current Humidity: ${
        data.at(-1)?.humidity
      } Raw value: ${data.at(-1)?.rawValue} Last reading: ${(
        (new Date().getTime() - data.at(-1)!.createdAt.getTime()) /
        60000
      ).toFixed(0)} min ago`}</span>
      <SensorLineChart
        data={humidityData}
        label="Humidity"
        strokeColor="#845EC2"
      />
      <SensorLineChart
        data={rawValueData}
        label="Raw moisture value"
        strokeColor="#FF6F91"
      />
    </>
  );
}
