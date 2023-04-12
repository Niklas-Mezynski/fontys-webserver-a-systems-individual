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

// const data = [
//   { date: new Date(2022, 0, 1), humidity: 10 },
//   { date: new Date(2022, 0, 2), value: 20 },
//   { date: new Date(2022, 0, 3), value: 15 },
//   { date: new Date(2022, 0, 4), value: 25 },
//   { date: new Date(2022, 0, 5), value: 30 },
//   { date: new Date(2022, 0, 6), value: 20 },
//   { date: new Date(2022, 0, 7), value: 15 },
// ];

export default function SensorLineChart() {
  const response = trpc.sensors.getSensorData.useQuery({ limit: 30 });

  const data = response.data?.map((item) => ({
    date: new Date(item.createdAt),
    humidity: item.humidity,
    rawValue: item.rawValue,
  }));

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
