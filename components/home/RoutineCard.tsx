import { Pressable, StyleSheet } from "react-native";
import { AppView, AppText, AppIcon, Card } from "../../components/theme";
import { useTheme } from "../../providers/ThemeProvider";
import { useState } from "react";
import { Fonts } from "../../constants/typography";

const routines = [
  {
    id: "breakfast", completed: true, warning: false,
    title: "Sarapan Nutrisi Mochi",
    detail: "08:00 WIB • Makanan Basah & Salmon Oil",
    badge: "Pagi",
  },
  {
    id: "medicine", completed: false, warning: true,
    title: "Obat Cacing Milo (Drontal Plus)",
    detail: "14:00 WIB • Bersama biskuit cemilan",
    badge: "Siang Ini",
  },
  {
    id: "walk", completed: false, warning: false,
    title: "Jalan Santai Sore Milo",
    detail: "17:00 WIB • Rute Taman Komplek",
    badge: "Nanti",
  },
];

export function RoutineCard() {
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => Object.fromEntries(routines.map((routine) => [routine.id, routine.completed])));

  const { colors, isDark } = useTheme();

  const card = {
    backgroundColor: colors.surfaceRaised,
    shadowColor: colors.neutral,
    shadowOpacity: isDark ? 0 : 0.09,
  };

  return (
    <Card style={[styles.panel, styles.shadow, card]}>
      <AppView style={styles.panelHeading}>
        <AppIcon name="calendar" color={colors.accent} size={20} />
        <AppText variant="subtitle" style={[styles.sectionTitle, styles.flex]}>
          Rutinitas & Jadwal Hari Ini
        </AppText>
        <AppText style={[styles.counter, { color: colors.accent }]}>
          {routines.filter((routine) => completed[routine.id]).length} / {routines.length} Selesai
        </AppText>
      </AppView>
      {routines.map((routine) => (
        <Pressable
          key={routine.id}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: completed[routine.id] }}
          accessibilityLabel={routine.title}
          onPress={() =>
            setCompleted((items) =>
              ({ ...items, [routine.id]: !items[routine.id] }),
            )
          }
          style={[
            styles.routine,
            {
              backgroundColor: completed[routine.id]
                ? colors.surface
                : colors.surfaceRaised,
              borderColor: colors.surface,
            },
          ]}
        >
          <AppView
            style={[
              styles.checkbox,
              {
                backgroundColor: completed[routine.id]
                  ? colors.accent
                  : colors.border,
              },
            ]}
          >
            {completed[routine.id] && (
              <AppIcon name="check" color={colors.onAccent} size={18} />
            )}
          </AppView>
          <AppView style={styles.flex}>
            <AppText
              style={[
                styles.routineTitle,
                completed[routine.id] && {
                  textDecorationLine: "line-through",
                  color: colors.muted,
                },
              ]}
            >
              {routine.title}
            </AppText>
            <AppText
              style={[
                styles.small,
                {
                  color:
                    !completed[routine.id] && routine.warning
                      ? colors.warningText
                      : colors.muted,
                },
              ]}
            >
              {routine.detail}
            </AppText>
          </AppView>
          <AppView
            style={[
              styles.badge,
              {
                backgroundColor: completed[routine.id]
                  ? colors.accentSoft
                  : routine.warning
                    ? colors.warningSoft
                    : colors.surface,
              },
            ]}
          >
            <AppText style={styles.badgeText}>
              {completed[routine.id] ? "Selesai" : routine.badge}
            </AppText>
          </AppView>
        </Pressable>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 0,
    padding: 16,
    borderRadius: 22,
    gap: 10,
    marginBottom: 24,
  },
  panelHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  shadow: {
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: { fontSize: 19, lineHeight: 25 },
  flex: { flex: 1, minWidth: 0 },
  counter: { fontSize: 11, lineHeight: 18, fontFamily: Fonts.bold },
  routine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    padding: 9,
    borderRadius: 14,
    borderWidth: 1,
  },
  checkbox: {
    width: 29,
    height: 29,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  routineTitle: { fontSize: 12, lineHeight: 18, fontFamily: Fonts.semiBold },
  small: { fontSize: 12, lineHeight: 18 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: { fontSize: 11, lineHeight: 17, fontFamily: Fonts.semiBold },
})
