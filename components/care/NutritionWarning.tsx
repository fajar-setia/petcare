import { Card, AppIcon, AppText, AppView } from "../theme";
import { useTheme } from "../../providers/ThemeProvider";
import { StyleSheet } from "react-native";
import { Fonts } from "../../constants/typography";

export function NutritionWarning() {
  const {colors, isDark} = useTheme()
  return (
    <Card
      style={[
        styles.warning,
        { backgroundColor: isDark ? colors.warningSoft : "#FBECD6" },
      ]}
    >
      <AppView
        style={[styles.warningIcon, { backgroundColor: colors.secondary }]}
      >
        <AppText style={styles.warningSymbol}>⚠</AppText>
      </AppView>
      <AppView style={styles.flex} gap={2}>
        <AppText style={styles.bold}>Perhatian Khusus Nutrisi</AppText>
        <AppText style={[styles.body, { color: colors.warningText }]}>
          Alergi: Biji Gandum & Gluten.
        </AppText>
        <AppText style={[styles.description, { color: colors.warningText }]}>
          Rekomendasi: Wet food salmon & taurine booster untuk kesehatan bulu
          dan pencernaan.
        </AppText>
      </AppView>
      <AppText style={{ color: colors.warningText }}>ⓘ</AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  warning: {
    borderWidth: 0,
    borderRadius: 17,
    flexDirection: "row",
    gap: 9,
    padding: 16,
  },
  warningIcon: {
    width: 35,
    height: 35,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  warningSymbol: { color: "#FFFFFF", fontSize: 24, lineHeight: 30 },
  flex: { flex: 1, minWidth: 0 },
  bold: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.bold },
  body: { fontSize: 14, lineHeight: 20 },
  description: { fontSize: 12, lineHeight: 18 },
})


