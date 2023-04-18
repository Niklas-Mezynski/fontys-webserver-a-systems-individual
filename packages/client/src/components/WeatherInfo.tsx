import { trpc } from '../lib/trpc';
import DataError from './utils/Error';
import DataLoading from './utils/Loading';

type Props = {};

export default function WeatherInfo({}: Props) {
  const response = trpc.weather.getWeatherData.useQuery(undefined, {
    retry: false,
  });

  if (response.isLoading) {
    return <DataLoading />;
  }

  if (response.isError) {
    return (
      <DataError
        message="Error while loading Weather data"
        details={response.error.message}
      />
    );
  }

  const data = response.data;

  return (
    <>
      <span className="mb-4 mt-8 text-xl text-center font-semibold lg:text-2xl">
        Current Weather Data
      </span>
      <div
        className="my-2
      grid grid-cols-3 gap-4
      md:grid md:grid-cols-5 lg:gap-12
    "
      >
        <WeatherDataDisplay
          label="Temperature"
          value={`${data.temperature}°C`}
        />
        <WeatherDataDisplay label="Humidity" value={`${data.humidity}%`} />
        <WeatherDataDisplay
          label="Precipitation"
          value={`${data.precipitation}mm`}
        />
        <WeatherDataDisplay label="UV-Index" value={`${data.uvIndex}`} />
        <WeatherDataDisplay label="Pressure" value={`${data.pressure}mb`} />
        <WeatherDataDisplay label="Cloud cover" value={`${data.cloud}%`} />
        <WeatherDataDisplay
          label="Updated"
          value={`${new Date(data.weatherMeasuredAt).toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}`}
        />
      </div>
    </>
  );
}

function WeatherDataDisplay({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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
