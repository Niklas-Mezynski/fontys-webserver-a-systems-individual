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

type Props = {
  dataAttribute: 'humidity' | 'rawValue';
  label: string;
  strokeColor?: string;
};

export default function SensorLineChart({
  dataAttribute,
  label,
  strokeColor,
}: Props) {
  const response = trpc.sensors.getSensorData.useQuery(
    { limit: 30 },
    { retry: 3 }
  );

  // const weatherResponse = trpc.weather.getWeatherData.useQuery(
  //   { lat: 51.274346498083055, lon: 6.618441633154181 },
  //   { retry: false }
  // );

  // console.log(weatherResponse.data?.current);

  if (response.isLoading) {
    return <DataLoading />;
  }

  if (response.isError) {
    return <DataError />;
  }

  const data = response.data?.map((item) => ({
    date: new Date(item.createdAt),
    value: item[dataAttribute],
  }));

  return (
    <LineChart
      width={Math.min(screen.width, 800)}
      height={Math.min(screen.width * 0.65, 520)}
      data={data}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        name={label}
        stroke={strokeColor || '#B3B388'}
      />
    </LineChart>
  );
}
