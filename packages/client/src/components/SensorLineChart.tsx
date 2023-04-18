import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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
      <XAxis
        dataKey="date"
        tickFormatter={(value: Date) =>
          value
            .toLocaleString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
            .replace(',', '')
        }
      />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip
        labelFormatter={(label: Date) =>
          label
            .toLocaleString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
            .replace(',', '')
        }
      />
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
