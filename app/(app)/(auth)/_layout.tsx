import { useStore } from '@store';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href='/(app)/(onboarding)/welcome-screen' />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          title: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='movie' />
      </Stack>
    </>
  );
}
