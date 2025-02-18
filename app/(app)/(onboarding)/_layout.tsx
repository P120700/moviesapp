import { useStore } from '@store';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href='/(app)/(auth)/' />;
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
        <Stack.Screen name='welcome-screen' />
        <Stack.Screen name='sign-in' />
        <Stack.Screen name='sign-up' />
      </Stack>
    </>
  );
}
