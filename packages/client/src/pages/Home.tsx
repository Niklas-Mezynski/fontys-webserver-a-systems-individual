import WeatherInfo from '../components/WeatherInfo';
import SensorSection from './SensorSection';

export default function Home() {
  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="text-center text-3xl font-bold text-gray-700 my-4 lg:my-8">
        <h1>Sensor data monitoring</h1>
      </div>
      <SensorSection />
      <WeatherInfo />
    </div>
  );
}
