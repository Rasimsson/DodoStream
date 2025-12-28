import React from 'react';
import { render, renderHook } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '@/theme/theme';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      // Avoid background GC timers in Jest.
      queries: { retry: false, gcTime: Infinity },
      mutations: { retry: false },
    },
  });
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: {
    queryClient?: QueryClient;
  }
) {
  const queryClient = options?.queryClient;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const themed = <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    if (!queryClient) return themed;
    return <QueryClientProvider client={queryClient}>{themed}</QueryClientProvider>;
  };

  return render(ui, { wrapper: Wrapper });
}

export function renderHookWithProviders<TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: {
    initialProps?: TProps;
    queryClient?: QueryClient;
  }
) {
  const queryClient = options?.queryClient;
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const themed = <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    if (!queryClient) return themed;
    return <QueryClientProvider client={queryClient}>{themed}</QueryClientProvider>;
  };

  return renderHook(callback, { wrapper: Wrapper, initialProps: options?.initialProps });
}
