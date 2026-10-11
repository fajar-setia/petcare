import {AppView, AppText, AppIcon} from "../theme";
import { StyleSheet } from "react-native";
import { Fonts } from "../../constants/typography";


export function ProfileIdentityCard() {
  return (
    <AppView style={styles.dedication}>
      <AppView style={styles.between}>
        <AppView style={styles.inline}>
          <AppIcon name="badge" size={20} color="#BCF3AD" />
          <AppText style={styles.dedicationTitle}>DEDIKASI PERAWATAN</AppText>
        </AppView>
        <AppText style={styles.year}>Tahun 2024</AppText>
      </AppView>
      <AppView style={styles.stats}>
        {[
          { value: "342", label: "Hari Bersama\nPawCare" },
          { value: "14", label: "Pemeriksaan\nSukses" },
          { value: "100%", label: "Jadwal Tepat\nWaktu" },
        ].map((stat, index) => (
          <AppView
            key={stat.label}
            style={[styles.stat, index > 0 && styles.statDivider]}
          >
            <AppText
              style={[styles.statValue, index === 2 && { color: "#FFE2A4" }]}
            >
              {stat.value}
            </AppText>
            <AppText style={styles.statLabel}>{stat.label}</AppText>
          </AppView>
        ))}
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  dedication: {
      backgroundColor: "#226C29",
      borderColor: "#126019",
      borderWidth: 1,
      borderRadius: 17,
      padding: 16,
      marginBottom: 24,
    },
    dedicationTitle: {
      fontSize: 12,
      color: "#F1FFE8",
      fontFamily: Fonts.semiBold,
    },
    year: {
      backgroundColor: "#216225",
      color: "#F1FFE8",
      fontFamily: Fonts.bold,
      fontSize: 11,
      lineHeight: 18,
      borderRadius: 9,
      paddingHorizontal: 8,
    },
    stats: { flexDirection: "row", marginTop: 12 },
    stat: { flex: 1, alignItems: "center", paddingHorizontal: 5 }, 
    statDivider: { borderLeftWidth: 1, borderLeftColor: "#438449" },
    statValue: {
    fontSize: 23,
    lineHeight: 28,
    fontFamily: Fonts.bold,
    color: "#F4FFDC",
  },
  statLabel: {
    fontSize: 11,
    lineHeight: 14,
    color: "#F4FFDC",
    textAlign: "center",
    fontFamily: Fonts.bold,
  },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexWrap: "wrap",
  },
})
