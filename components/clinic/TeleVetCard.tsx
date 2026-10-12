import { AppIcon, AppText, AppView, Card } from "../theme";
import { ClinicAction } from "./ClinicAction";
import { showFeature } from "../../utils/feature";
import { Fonts } from "../../constants/typography";
import { useTheme } from "../../providers/ThemeProvider";
import { StyleSheet } from "react-native";

export function TeleVetCard() {
  const {colors} = useTheme();

  const soft = { backgroundColor: colors.surface };
  return (
    <Card style={[styles.teleVet, soft]}>
      <AppView style={styles.flex} gap={4}>
        <AppView row gap={6} style={styles.center}>
          <AppIcon name="support" size={15} color={colors.accent} />
          <AppText
            style={[
              styles.small,
              { color: colors.accent, fontFamily: Fonts.bold },
            ]}
          >
            TELE-VET INSTAN
          </AppText>
        </AppView>
        <AppText style={styles.heading}>Ragu Kondisi Anabul?</AppText>
        <AppText color="muted" style={styles.description}>
          Konsultasi dokter hewan online dalam 5 menit tanpa antre.
        </AppText>
      </AppView>
      <ClinicAction
        title="Mulai Chat"
        compact
        onPress={() => showFeature("Tele-Vet Instan")}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  teleVet: {
    borderWidth: 0,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginTop: 6,
  },
  flex: { flex: 1, minWidth: 0 },
  center: { alignItems: "center" },
  small: { fontSize: 11, lineHeight: 15, fontFamily: Fonts.medium },
  heading: { fontSize: 17, lineHeight: 23, fontFamily: Fonts.bold },
  description: { fontSize: 12, lineHeight: 18 },
})
