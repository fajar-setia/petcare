import { AppIcon, AppText, AppView, Card } from "../theme";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { showFeature } from "../../utils/feature";
import { Fonts } from "../../constants/typography";

export function MedicalSchedule() {
  const {colors, isDark} = useTheme();

  const surface = { backgroundColor: colors.surfaceRaised };
  const greenBadge = {
    backgroundColor: isDark ? colors.accentSoft : "#A4F49B",
  };
  return (
    <AppView gap={10}>
      <AppView row gap={8} style={styles.center}>
        <AppIcon name="calendar" size={21} color={colors.accent} />
        <AppText style={[styles.heading, styles.flex]}>
          Jadwal Medis Terdekat
        </AppText>
        <AppText style={[styles.small, { color: colors.accent }]}>
          2 Tertunda
        </AppText>
      </AppView>
      <Card style={[styles.schedule, surface]}>
        <AppView style={[styles.scheduleIcon, greenBadge]}>
          <AppIcon name="medicine" size={23} color={colors.accent} />
        </AppView>
        <AppView style={styles.flex}>
          <AppText style={styles.bold}>Vaksin Rabies Booster</AppText>
          <AppView row gap={5} style={styles.center}>
            <AppIcon name="calendar" size={12} color={colors.muted} />
            <AppText color="muted" style={styles.small}>
              Jatuh tempo 12 Nov 2024
            </AppText>
          </AppView>
        </AppView>
        <AppText
          style={[
            styles.badge,
            {
              backgroundColor: colors.warningSoft,
              color: colors.warningText,
            },
          ]}
        >
          18 Hari Lagi
        </AppText>
      </Card>
      <Card style={[styles.schedule, surface]}>
        <AppView style={[styles.scheduleIcon, greenBadge]}>
          <AppIcon name="medicine" size={22} color={colors.accent} />
        </AppView>
        <AppView style={styles.flex}>
          <AppText style={styles.bold}>Obat Kutu Rutin (Spot-on)</AppText>
          <AppText color="muted" style={styles.small}>
            ⇄ Tiap bulan (Awal bulan)
          </AppText>
        </AppView>
        <Pressable
          accessibilityRole="button"
          onPress={() => showFeature("Pemberian obat kutu")}
          style={[styles.give, { backgroundColor: colors.primary }]}
        >
          <AppIcon name="check" size={13} color={colors.onPrimary} />
          <AppText
            style={[
              styles.small,
              { color: colors.onPrimary, fontFamily: Fonts.bold },
            ]}
          >
            Berikan
          </AppText>
        </Pressable>
      </Card>
    </AppView>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center" },
  heading: { fontSize: 19, lineHeight: 25, fontFamily: Fonts.brandMedium },
   small: { fontSize: 11, lineHeight: 16, fontFamily: Fonts.semiBold },
   flex: { flex: 1, minWidth: 0 },
   schedule: {
    borderWidth: 0,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 8,
  },
  scheduleIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bold: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.bold },
  badge: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.semiBold,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  give: {
    borderRadius: 16,
    paddingHorizontal: 10,
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
})
