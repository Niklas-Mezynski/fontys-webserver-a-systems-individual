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

type Props = {};

export default function WeatherInfo({}: Props) {
  const response = trpc.weather.getWeatherData.useQuery(
    { lat: 51.274346498083055, lon: 6.618441633154181 },
    { retry: false }
  );

  if (response.isLoading) {
    return <DataLoading />;
  }

  if (response.isError) {
    return <DataError />;
  }

  const data = response.data;

  return (
    <div
      className="my-2
      grid grid-cols-3 gap-4
      md:grid md:grid-cols-5 lg:gap-12
    "
    >
      <NewFunction label="Temperature" value={`${data.current.temp_c}°C`} />
      <NewFunction label="Humidity" value={`${data.current.humidity}%`} />
      <NewFunction
        label="Precipitation"
        value={`${data.current.precip_mm}mm`}
      />
      <NewFunction label="UV-Index" value={`${data.current.uv}`} />
      <NewFunction label="Pressure" value={`${data.current.pressure_mb}mb`} />
      <NewFunction label="Cloud cover" value={`${data.current.cloud}%`} />
      <NewFunction label="Updated" value={`${data.current.last_updated}`} />
    </div>
  );
}

function NewFunction({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-evenly items-center">
      <span className="mb-2 text-lg text-center text-teal-600 font-semibold lg:text-xl">
        {label}
      </span>
      <span className="text-base text-center text-teal-500 lg:text-lg">
        {value}
      </span>
    </div>
  );
}
