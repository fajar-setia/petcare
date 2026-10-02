import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../providers/ThemeProvider";

export function ThemedStatusBar() {
  const { isDark } = useTheme();

  return <StatusBar style={isDark ? "light" : "dark"} hidden={false} />;
}
