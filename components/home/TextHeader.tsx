import { useTheme } from "../../providers/ThemeProvider";
import { AppIcon, AppText, AppView } from "../theme";
import { StyleSheet } from "react-native";

export function TextHeader({ name, petNames }: { name: string; petNames: string }) {
  const { colors } = useTheme();
  return (
    <AppView style={styles.greeting}>
      <AppView style={styles.flex}>
        <AppText variant="title" style={styles.greetingTitle}>
          Halo, {name}! 👋
        </AppText>
        <AppText variant="body" style={styles.body} color="muted">
          Bagaimana kabar {petNames} hari ini?
        </AppText>
      </AppView>
      <AppView
        style={[styles.greetingIcon, { backgroundColor: colors.accentSoft }]}
      >
        <AppIcon name="care" color={colors.accent} size={28} />
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  greetingTitle: { fontSize: 28, lineHeight: 36 },
  flex: { flex: 1, minWidth: 0 },
  greeting: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  greetingIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { fontSize: 14, lineHeight: 20 },
})
