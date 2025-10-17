// app/_layout.tsx
import LanguageSwitcher from "@/components/languageToggler";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";

function RouteGuard({ children }: { children: React.ReactNode }) {
  // TODO: wire these to your real auth state
  const isAuth = false;
  const isLoading = false;

  const router = useRouter();
  const segments = useSegments(); // e.g., ["auth"] or ["index"]
  useEffect(() => {}, []);
  useEffect(() => {
    if (isLoading) return;

    const onAuth = segments[0] === "auth";

    if (!isAuth && !onAuth) {
      router.replace("/auth"); // requires app/auth/index.tsx or app/auth.tsx
    } else if (isAuth && onAuth) {
      router.replace("/"); // requires app/index.tsx (or your main route)
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
          {/* Must match a real file: app/auth/index.tsx or app/auth.tsx */}
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
          {/* Must match app/index.tsx (home) */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </PaperProvider>
  );
}
