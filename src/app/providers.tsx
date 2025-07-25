"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AccountKitProvider } from "@account-kit/react";
import { config } from "@/config";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AccountKitProvider config={config}>
        {children}
      </AccountKitProvider>
    </QueryClientProvider>
  );
}
