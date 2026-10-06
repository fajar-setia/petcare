import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";

export function ThemedStatusBar() {
  const { isDark } = useTheme();
  const style = isDark ? "light" : "dark";
  // Android ditangani Stack; jangan menimpa pengaturan native-nya dari JS.
  if (Platform.OS === "android") return null;

  return <StatusBar style={style} hidden={false} />;
}
