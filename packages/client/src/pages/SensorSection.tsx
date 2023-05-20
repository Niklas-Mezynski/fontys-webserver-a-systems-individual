import SensorLineChart from '../components/SensorLineChart';
import DataError from '../components/utils/Error';
import DataLoading from '../components/utils/Loading';
import { trpc } from '../lib/trpc';

const SENSOR_TYPES = ['FIRST', 'SECOND', 'THIRD'];

function SensorSection() {
  //   type argus = inferAsyncReturnType<typeof trpc.sensors.getSensorData.useQuery>;
  const sensorCurrentResponse = trpc.sensors.getSensorData.useQuery(
    { limit: 30, sensorTypes: SENSOR_TYPES },
    { retry: false, refetchInterval: 30000 }
  );
  const sensorAvgResponse = trpc.sensors.getSensorDataAveraged.useQuery(
    { limit: 30, sensorTypes: SENSOR_TYPES },
    { retry: false, refetchInterval: 30000 }
  );

  if (sensorCurrentResponse.isLoading || sensorAvgResponse.isLoading) {
    return <DataLoading />;
  }

  if (sensorCurrentResponse.isError || sensorAvgResponse.isError) {
    return (
      <DataError
        message="Error while loading sensor data"
        details={`Sensor data: ${sensorCurrentResponse.error?.message} Sensor data averaged: ${sensorAvgResponse.error?.message}`}
      />
    );
  }

  const sensorCurrentTypes = sensorCurrentResponse.data?.map(
    (item) => item.sensor
  );
  const sensorCurrentData: {
    [x: string]: number | Date;
    date: Date;
  }[] = [];

  if (sensorCurrentTypes?.length > 0) {
    for (let i = sensorCurrentResponse.data[0].data.length - 1; i >= 1; i--) {
      let dataPoint = {
        date: new Date(sensorCurrentResponse.data[0].data[i].createdAt),
        [sensorCurrentResponse.data[0].sensor]:
          sensorCurrentResponse.data[0].data[i].humidity,
      };
      for (let j = 1; j < sensorCurrentTypes.length; j++) {
        dataPoint[sensorCurrentResponse.data[j].sensor] =
          sensorCurrentResponse.data[j].data[i].humidity;
      }
      sensorCurrentData.push(dataPoint);
    }
  }

  const sensorAvgTypes = sensorAvgResponse.data?.map((item) => item.sensor);
  const sensorAvgData: {
    [x: string]: number | Date;
    date: Date;
  }[] = [];

  if (sensorAvgTypes?.length > 0) {
    for (let i = sensorAvgResponse.data[0].data.length - 1; i >= 1; i--) {
      let dataPoint = {
        date: new Date(sensorAvgResponse.data[0].data[i].createdAt),
        [sensorAvgResponse.data[0].sensor]:
          sensorAvgResponse.data[0].data[i].humidity,
      };
      for (let j = 1; j < sensorAvgTypes.length; j++) {
        dataPoint[sensorAvgResponse.data[j].sensor] =
          sensorAvgResponse.data[j].data[i].humidity;
      }
      sensorAvgData.push(dataPoint);
    }
  }

  const strokeColors = ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F'];

  const currentHumidityAvg =
    (
      SENSOR_TYPES.map((type) => sensorCurrentData.at(-1)?.[type]) as number[]
    ).reduce((p, c) => p + c, 0) / SENSOR_TYPES.length;

  return (
    <>
      <span className="my-2">
        {`Current Humidity: `}
        <span className="font-bold">{`${currentHumidityAvg.toFixed(2)}%`}</span>
        {` Last reading: ${(
          (new Date().getTime() -
            (sensorCurrentData.at(-1)?.date.getTime() ||
              new Date().getTime())) /
          60000
        ).toFixed(0)} min ago`}
      </span>
      <SensorLineChart
        title="Average Humidity (longer time range)"
        data={sensorAvgData}
        dataLineSpecs={
          SENSOR_TYPES?.map((item, index) => ({
            dataKey: item,
            strokeColor: strokeColors[index],
            label: item[0].toUpperCase() + item.slice(1).toLowerCase(),
          })) || []
        }
      />
      <SensorLineChart
        title="Current Humidity development"
        data={sensorCurrentData}
        dataLineSpecs={
          SENSOR_TYPES.map((item, index) => ({
            dataKey: item,
            strokeColor: strokeColors[index],
            label: item[0].toUpperCase() + item.slice(1).toLowerCase(),
          })) || []
        }
      />
    </>
  );
}

export default SensorSection;
