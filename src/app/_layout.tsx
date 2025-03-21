import { Stack, Slot, router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useState } from "react";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="product" options={{ headerShown: false }} />
    
    </Stack>
  );
}
