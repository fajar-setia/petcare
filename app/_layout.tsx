import {
  Stack,
  ThemeProvider as NavigationThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "expo-router";
import { ThemeProvider, useTheme } from "../providers/ThemeProvider";

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
      <Stack
        screenOptions={{
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
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
