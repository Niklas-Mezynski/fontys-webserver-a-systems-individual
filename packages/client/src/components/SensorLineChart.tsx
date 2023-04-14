import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { trpc } from '../lib/trpc';
import DataLoading from './utils/loading';
import DataError from './utils/error';

export default function SensorLineChart() {
  const response = trpc.sensors.getSensorData.useQuery(
    { limit: 30 },
    { retry: 3 }
  );

  const weatherResponse = trpc.weather.getWeatherData.useQuery(
    { lat: 51.274346498083055, lon: 6.618441633154181 },
    { retry: false }
  );
  console.log(weatherResponse.data?.current);

  const data = response.data?.map((item) => ({
    date: new Date(item.createdAt),
    humidity: item.humidity,
    rawValue: item.rawValue,
  }));

  if (response.isLoading) {
    return <DataLoading />;
  }

  if (response.isError) {
    return <DataError />;
  }

  return (
    <LineChart width={600} height={400} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="humidity"
        name="Humidity"
        stroke="#8884d8"
      />
      <Line
        type="monotone"
        dataKey="rawValue"
        name="Moisture value"
        stroke="#B3B388"
      />
    </LineChart>
  );
}
