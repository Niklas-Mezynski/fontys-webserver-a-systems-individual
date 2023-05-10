import SensorLineChart from '../components/SensorLineChart';
import DataError from '../components/utils/Error';
import DataLoading from '../components/utils/Loading';
import { trpc } from '../lib/trpc';

function SensorSection() {
  //   type argus = inferAsyncReturnType<typeof trpc.sensors.getSensorData.useQuery>;
  const sensorResponse = trpc.sensors.getSensorData.useQuery(
    { limit: 30 },
    { retry: false, refetchInterval: 30000 }
  );
  const sensorAvgResponse = trpc.sensors.getSensorDataAveraged.useQuery(
    { limit: 30 },
    { retry: false, refetchInterval: 30000 }
  );

  if (sensorResponse.isLoading || sensorAvgResponse.isLoading) {
    return <DataLoading />;
  }

  if (sensorResponse.isError || sensorAvgResponse.isError) {
    return (
      <DataError
        message="Error while loading sensor data"
        details={`Sensor data: ${sensorResponse.error?.message} Sensor data averaged: ${sensorAvgResponse.error?.message}`}
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

  const dataAvg = sensorAvgResponse
    .data![0].data.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const humidityDataAvg = dataAvg.map((item) => ({
    date: new Date(item.createdAt),
    value: item.humidity,
  }));

  return (
    <>
      <span className="my-2">
        {`Current Humidity: `}
        <span className="font-bold">{`${data.at(-1)?.humidity}%`}</span>
        {` Last reading: ${(
          (new Date().getTime() -
            (data.at(-1)?.createdAt.getTime() || new Date().getTime())) /
          60000
        ).toFixed(0)} min ago`}
      </span>
      <SensorLineChart
        data={humidityDataAvg}
        label="Humidity long range"
        strokeColor="#FF6F91"
      />
      <SensorLineChart
        data={humidityData}
        label="Humidity current development"
        strokeColor="#845EC2"
      />
    </>
  );
}

export default SensorSection;
