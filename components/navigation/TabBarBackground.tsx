import { AppView } from "../theme/AppView";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

import { useTheme } from "../../providers/ThemeProvider";

export function TabBarBackground() {
  const { colors, isDark } = useTheme();

  return (
    <AppView style={styles.container}>
      <BlurView
        intensity={70}
        tint={isDark ? "dark" : "light"}
        style={StyleSheet.absoluteFill}
      />

      <AppView
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colors.surface,
            opacity: 0.35,
          },
        ]}
      />
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 36,
    overflow: "hidden",
  },
});