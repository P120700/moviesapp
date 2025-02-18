import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
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
        <Stack.Screen name='(auth)' />
        <Stack.Screen name='(onboarding)' />
      </Stack>
    </>
  );
}
