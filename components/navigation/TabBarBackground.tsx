import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../../providers/ThemeProvider";

export function TabBarBackground() {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <BlurView
        intensity={70}
        tint={isDark ? "dark" : "light"}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colors.surface,
            opacity: 0.35,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 36,
    overflow: "hidden",
  },
});