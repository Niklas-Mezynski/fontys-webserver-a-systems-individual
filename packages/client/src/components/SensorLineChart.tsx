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
  dataLineSpecs: {
    label: string;
    dataKey: string;
    strokeColor?: string;
  }[];
  data: {
    date: Date;
    [x: string]: number | Date;
  }[];
  title?: string;
};

export default function SensorLineChart({ data, dataLineSpecs, title }: Props) {
  return (
    <>
      <h2 className="text-2xl mb-1 mt-3">{title}</h2>
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
        {dataLineSpecs.map((lineSpec, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={lineSpec.dataKey}
            name={lineSpec.label}
            stroke={lineSpec.strokeColor || '#B3B388'}
          />
        ))}
      </LineChart>
    </>
  );
}
