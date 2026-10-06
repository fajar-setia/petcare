import { useTheme } from "../../providers/ThemeProvider";
import { AppIcon, AppText, AppView } from "../theme";
import { StyleSheet, Pressable } from "react-native";
import { Fonts } from "../../constants/typography";
import { showFeature } from "../../utils/feature";

export function HealthStatusCard() {
  const {colors} = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => showFeature("Status kesehatan")}
      style={[styles.healthCard, { backgroundColor: colors.surface }]}
    >
      <AppView
        style={[styles.healthIcon, { backgroundColor: colors.accentSoft }]}
      >
        <AppIcon name="health" color={colors.accent} size={22} />
      </AppView>
      <AppView style={styles.flex}>
        <AppText style={[styles.healthTitle, { color: colors.accent }]}>
          STATUS KESEHATAN PRIMA
        </AppText>
        <AppText
          variant="caption"
          style={styles.small}
          color="muted"
          numberOfLines={1}
        >
          Semua vaksin & nutrisi teratur minggu ini
        </AppText>
      </AppView>
      <AppText color="muted" style={styles.chevron}>
        ›
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  healthCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
  },
  healthIcon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
    },
    healthTitle: {
      fontFamily: Fonts.semiBold,
      fontSize: 12,
      lineHeight: 20,
      letterSpacing: 0.4,
    },
    chevron: { fontSize: 27, lineHeight: 30 },
    small: { fontSize: 12, lineHeight: 18 },
})
