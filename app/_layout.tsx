import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function RootLayout() {
  const [loaded, error] = useFonts({
    NunitoSansExtraBold: require('@assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    NunitoSansBold: require('@assets/fonts/NunitoSans_10pt-Bold.ttf'),
    NunitoSansSemibold: require('@assets/fonts/NunitoSans_10pt-SemiBold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}

export default RootLayout;
