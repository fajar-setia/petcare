import { useIsFocused } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../providers/ThemeProvider";

export function ThemedStatusBar() {
  const isFocused = useIsFocused();
  const { isDark } = useTheme();

  // Tab yang tidak aktif masih bisa mounted. Hanya layar aktif mengatur bar.
  if (!isFocused) return null;

  return <StatusBar style={isDark ? "light" : "dark"} hidden={false} />;
}
