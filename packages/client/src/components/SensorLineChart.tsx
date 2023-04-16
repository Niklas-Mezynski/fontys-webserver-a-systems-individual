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
import DataLoading from './utils/Loading';
import DataError from './utils/Error';

type Props = {
  label: string;
  data: {
    date: Date;
    value: number | string;
  }[];
  strokeColor?: string;
};

export default function SensorLineChart({ label, data, strokeColor }: Props) {
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
