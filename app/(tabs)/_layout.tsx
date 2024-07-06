import { Stack } from "expo-router";
import React from "react";
import AuthProvider from "../providers/AuthProvider";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
