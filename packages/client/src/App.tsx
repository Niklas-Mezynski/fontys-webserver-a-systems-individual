import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import './App.css';
import SensorLineChart from './components/SensorLineChart';
import { trpc } from './lib/trpc';
import WeatherInfo from './components/WeatherInfo';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_API_URL,
        }),
      ],
    });
  });

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <div className="mx-auto flex flex-col items-center">
          <div className="text-center text-3xl font-bold text-gray-700 my-4 lg:my-8">
            <h1>Sensor data monitoring</h1>
          </div>
          <SensorLineChart
            dataAttribute="humidity"
            label="Humidity"
            strokeColor="#845EC2"
          />
          <SensorLineChart
            dataAttribute="rawValue"
            label="Raw moisture value"
            strokeColor="#FF6F91"
          />
          <WeatherInfo />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
