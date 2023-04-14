import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import './App.css';
import SensorLineChart from './components/SensorLineChart';
import { trpc } from './lib/trpc';

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
        <div className="max-w-xl mx-auto">
          <div className="text-center text-3xl font-bold text-gray-700">
            <h1>Argus</h1>
          </div>
          <SensorLineChart />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
