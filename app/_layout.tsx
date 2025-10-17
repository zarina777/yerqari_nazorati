// app/_layout.tsx
import LanguageSwitcher from "@/components/languageToggler";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const isAuth = false;
  const isLoading = false;

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const onAuthScreen = segments[0] === "auth";

    if (!isAuth && !onAuthScreen) {
      router.replace("/auth");
    } else if (isAuth && onAuthScreen) {
      router.replace("/");
    }
  }, [isAuth, isLoading, segments, router]);

  return <>{children}</>;
}

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1E88E5",
    secondary: "#FFC107",
    background: "#F9FAFB",
    surface: "#FFFFFF",
    text: "#111827",
    onSurfaceVariant: "#6B7280",
    error: "#E53935",
  },
  roundness: 10,
};

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <RouteGuard>
        <Stack>
          <Stack.Screen
            name="auth"
            options={{
              headerTitle: () => (
                <Text style={{ fontWeight: "700", fontSize: 18 }}>
                  E-yer qa'ri nazorati
                </Text>
              ),
              headerTitleAlign: "center",
              headerRight: () => <LanguageSwitcher />,
            }}
          />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </PaperProvider>
  );
}
