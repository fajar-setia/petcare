import {
  Stack,
  ThemeProvider as NavigationThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "expo-router";
import { ThemeProvider, useTheme } from "../providers/ThemeProvider";
import { ThemedStatusBar } from "../components/theme/ThemedStatusBar";
import { Platform } from "react-native";

import { useFonts } from "expo-font";

import {
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

function Navigation() {
  const { colors, isDark } = useTheme();
  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  return (
    <NavigationThemeProvider
      value={{
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          primary: colors.accent,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
        },
      }}
    >
      <ThemedStatusBar />
      <Stack
        screenOptions={{
          // Native screens mengelola status bar sepanjang transisi Android.
          ...(Platform.OS === "android" && {
            statusBarStyle: isDark ? "light" : "dark",
            statusBarHidden: false,
          }),
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{headerShown: false, title: "PawCare" }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack>
    </NavigationThemeProvider>
  );
}
export default function RootLayout() {
    const [fontsLoaded] = useFonts({
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,

    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
