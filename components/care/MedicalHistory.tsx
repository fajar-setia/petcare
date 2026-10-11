import { AppIcon, AppText, Card, AppView } from "../theme";
import { useTheme } from "../../providers/ThemeProvider";
import { StyleSheet } from "react-native";
import { records } from "../../constants/careData";
import { Fonts } from "../../constants/typography";

export function MedicalHistory() {
  const { colors, isDark } = useTheme();

  const surface = { backgroundColor: colors.surfaceRaised };
  const greenBadge = {
    backgroundColor: isDark ? colors.accentSoft : "#A4F49B",
  };
  return (
    <AppView gap={10}>
      <AppView row gap={8} style={styles.center}>
        <AppIcon name="record" size={20} color={colors.accent} />
        <AppText style={[styles.heading, styles.flex]}>
          Riwayat Medis & Catatan Dokter
        </AppText>
        <AppText style={[styles.small, styles.recordCount]}>3 Catatan</AppText>
      </AppView>
      <Card style={[styles.history, surface]}>
        {records.map((record, index) => (
          <AppView key={record.title} row gap={10}>
            <AppView style={styles.timeline}>
              <AppView
                style={[
                  styles.circle,
                  index === 2
                    ? { backgroundColor: colors.surface }
                    : greenBadge,
                ]}
              >
                <AppIcon name={record.icon} size={16} color={colors.accent} />
              </AppView>
              {index < records.length - 1 && (
                <AppView
                  style={[styles.line, { backgroundColor: colors.border }]}
                />
              )}
            </AppView>
            <AppView style={styles.flex} gap={2}>
              <AppView row style={styles.between} gap={8}>
                <AppText style={styles.small}>{record.date}</AppText>
                <AppText
                  style={[
                    styles.small,
                    { color: index === 2 ? colors.muted : colors.accent },
                  ]}
                >
                  {record.category}
                </AppText>
              </AppView>
              <AppText style={styles.bold}>{record.title}</AppText>
              <AppText color="muted" style={styles.description}>
                {record.description}
              </AppText>
              <AppView row gap={5} style={styles.doctor}>
                <AppIcon
                  name={index === 1 ? "clinic" : "profile"}
                  size={12}
                  color={colors.accent}
                />
                <AppText
                  style={[styles.small, styles.flex, { color: colors.accent }]}
                >
                  {record.doctor}
                </AppText>
              </AppView>
            </AppView>
          </AppView>
        ))}
      </Card>
    </AppView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  center: { alignItems: "center" },
  heading: { fontSize: 19, lineHeight: 25, fontFamily: Fonts.brandMedium },
  small: { fontSize: 11, lineHeight: 16, fontFamily: Fonts.semiBold },
  recordCount: { maxWidth: 52 },
  history: { borderWidth: 0, borderRadius: 18, padding: 15, gap: 19 },
  timeline: { alignItems: "center", width: 30 },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  line: { width: 1, flex: 1, marginTop: 5 },
  between: { alignItems: "center", justifyContent: "space-between" },
  bold: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.bold },
  description: { fontSize: 12, lineHeight: 18 },
  doctor: { alignItems: "center", marginTop: 3 },
});
