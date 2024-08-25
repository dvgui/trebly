'use client';
import { configWagmi } from '@/app/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <>
            <WagmiProvider config={configWagmi}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>;
        </>
        );
}