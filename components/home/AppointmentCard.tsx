import { type Appointment } from "../../constants/homeData";
import { Alert, Pressable } from "react-native";
import { AppIcon, AppText, AppView, Card } from "../theme";
import { useTheme } from "../../providers/ThemeProvider";
import { showFeature } from "../../utils/feature";
import { StyleSheet } from "react-native";
import { Fonts } from "../../constants/typography";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const { colors } = useTheme();
  return (
    <Card
      style={[
        styles.appointment,
        styles.shadow,
        { backgroundColor: colors.surface },
      ]}
    >
      <AppView style={styles.appointmentTop}>
        <AppView style={[styles.badge, { backgroundColor: colors.accent }]}>
          <AppText style={[styles.badgeText, { color: colors.onAccent }]}>
            Janji Temu Mendatang
          </AppText>
        </AppView>
        <AppText variant="caption" style={styles.small}>
          {appointment.time}
        </AppText>
      </AppView>
      <AppView style={styles.petHeading}>
        <AppView
          style={[
            styles.doctorAvatar,
            { backgroundColor: colors.surfaceRaised },
          ]}
        >
          <AppIcon name="clinic" size={30} color={colors.accent} />
        </AppView>
        <AppView style={styles.flex}>
          <AppText variant="subtitle" style={styles.doctorName}>
            {appointment.doctor}
          </AppText>
          <AppText color="muted" style={styles.small}>
            {appointment.clinic}
          </AppText>
          <AppText style={[styles.small, { color: colors.accent }]}>
            ● {appointment.reason}
          </AppText>
        </AppView>
      </AppView>
      <AppView style={styles.appointmentButtons}>
        <Pressable
          accessibilityRole="button"
          onPress={() => showFeature("Chat dokter")}
          style={[
            styles.actionButton,
            { backgroundColor: colors.surfaceRaised },
          ]}
        >
          <AppIcon name="chat" color={colors.accent} size={17} />
          <AppText style={[styles.buttonText, { color: colors.accent }]}>
            Chat Dokter
          </AppText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert(
              "Detail janji temu — contoh",
              [appointment.time, appointment.doctor, appointment.clinic, appointment.reason].join("\n"),
            )
          }
          style={[styles.actionButton, { backgroundColor: colors.accent }]}
        >
          <AppText style={[styles.buttonText, { color: colors.onAccent }]}>
            Lihat Detail
          </AppText>
        </Pressable>
      </AppView>
    </Card>
  );
}

const styles = StyleSheet.create({
  appointment: {
    borderWidth: 0,
    padding: 18,
    borderRadius: 22,
    gap: 16,
    marginBottom: 26,
  },
  appointmentTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  shadow: {
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 2,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: { fontSize: 11, lineHeight: 17, fontFamily: Fonts.semiBold },
  weight: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  small: { fontSize: 12, lineHeight: 18 },
  petHeading: { flexDirection: "row", alignItems: "center", gap: 10 },
  doctorAvatar: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, minWidth: 0 },
  doctorName: { fontSize: 15, lineHeight: 22 },
  appointmentButtons: { flexDirection: "row", gap: 10 },
  actionButton: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  buttonText: { fontSize: 12, lineHeight: 18, fontFamily: Fonts.bold },
})
