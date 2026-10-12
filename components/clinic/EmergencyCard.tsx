import { AppIcon, AppText, AppView, Card } from "../theme";
import { ClinicAction } from "./ClinicAction";
import { showFeature } from "../../utils/feature";
import { useTheme } from "../../providers/ThemeProvider";
import { StyleSheet } from "react-native";
import { Fonts } from "../../constants/typography";

export function EmergencyCard() {
  const { isDark} = useTheme()
  return (
    <Card
      style={[
        styles.emergency,
        { backgroundColor: isDark ? "#382624" : "#FFF0E5" },
      ]}
    >
      <AppView row gap={8} style={styles.center}>
        <AppView style={styles.emergencyIcon}>
          <AppText style={styles.asterisk}>✱</AppText>
        </AppView>
        <AppText
          style={[
            styles.medium,
            styles.flex,
            { color: isDark ? "#FFB4AC" : "#B9000A" },
          ]}
        >
          UGD & Siaga 24 Jam
        </AppText>
        <AppText
          style={[
            styles.badge,
            {
              backgroundColor: isDark ? "#64302D" : "#FFDCCB",
              color: isDark ? "#FFB4AC" : "#B9000A",
            },
          ]}
        >
          Siap Tanggap
        </AppText>
      </AppView>
      <AppText color="muted" style={styles.description}>
        Ambulans darurat, penanganan trauma, dan tim veteriner siaga penuh untuk
        anabul kesayangan.
      </AppText>
      <AppView row gap={8}>
        <ClinicAction
          title="Panggil Ambulans (1500–PAW)"
          icon="phone"
          danger
          onPress={() => showFeature("Ambulans Darurat — Data Contoh")}
        />
        <ClinicAction
          icon="clinic"
          title="UGD"
          secondary
          compact
          onPress={() => showFeature("Layanan UGD")}
        />
      </AppView>
    </Card>
  );
}

const styles = StyleSheet.create({
  emergency: { borderWidth: 0, borderRadius: 19, padding: 15, gap: 12 },
  emergencyIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#C90D16",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  asterisk: { fontSize: 24, lineHeight: 29, color: "#FFFFFF" },
   flex: { flex: 1, minWidth: 0 },
  center: { alignItems: "center" },
  medium: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.semiBold },
  badge: {
    fontSize: 10,
    lineHeight: 15,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  description: { fontSize: 12, lineHeight: 18 },
})
