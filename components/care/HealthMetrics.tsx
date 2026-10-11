import { AppIcon, AppText, AppView, Card } from "../theme";
import { metrics } from "../../constants/careData";
import { useTheme } from "../../providers/ThemeProvider";
import { StyleSheet } from "react-native";
import { Fonts } from "../../constants/typography";

export function HealthMetrics() {
  const { colors, isDark } = useTheme();

  const surface = { backgroundColor: colors.surfaceRaised };
  const greenBadge = {
    backgroundColor: isDark ? colors.accentSoft : "#A4F49B",
  };
  return (
    <AppView row gap={8}>
      {metrics.map((metric) => (
        <Card key={metric.label} style={[styles.metric, surface]}>
          <AppView style={[styles.circle, { backgroundColor: colors.surface }]}>
            <AppIcon
              name={metric.icon}
              size={19}
              color={
                metric.icon === "heart" ? colors.warningText : colors.accent
              }
            />
          </AppView>
          <AppText style={styles.small}>{metric.label}</AppText>
          <AppText style={styles.value}>
            {metric.value}
            <AppText style={styles.small}>{metric.unit}</AppText>
          </AppText>
          <AppText style={[styles.badge, greenBadge, { color: colors.text }]}>
            {metric.status}
          </AppText>
        </Card>
      ))}
    </AppView>
  );
}

const styles = StyleSheet.create({
  metric: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 18,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    gap: 3,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  value: { fontFamily: Fonts.bold, fontSize: 21, lineHeight: 25 },
  small: { fontSize: 11, lineHeight: 16, fontFamily: Fonts.semiBold },
  badge: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.semiBold,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
});
