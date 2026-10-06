import { StyleSheet } from "react-native";
import { AppText, AppView, Card, Photo, AppIcon } from "../theme";
import { useTheme } from "../../providers/ThemeProvider";
import { type Pet } from "../../constants/homeData";
import { Fonts } from "../../constants/typography";

export function PetCard({ pet, width }: { pet: Pet; width: number }) {
  const { colors, isDark } = useTheme();

  const card = {
    backgroundColor: colors.surfaceRaised,
    shadowColor: colors.neutral,
    shadowOpacity: isDark ? 0 : 0.09,
  };

  return (
    <Card
      style={[styles.petCard, styles.shadow, card, { width }]}
    >
      <AppView style={styles.petHeading}>
        <Photo uri={pet.photo} label={pet.name} />
        <AppView style={styles.flex}>
          <AppText variant="subtitle" style={styles.petName}>
            {pet.name}{" "}
            <AppText style={{ color: colors.accent }}>{pet.sex}</AppText>
          </AppText>
          <AppText variant="caption" style={styles.small} color="muted">
            {pet.breed} • {pet.age}
          </AppText>
        </AppView>
      </AppView>
      <AppView style={styles.badges}>
        <AppView
          style={[
            styles.badge,
            {
              backgroundColor: pet.warning
                ? colors.warningSoft
                : colors.surface,
            },
          ]}
        >
          <AppText
            style={[
              styles.badgeText,
              {
                color: pet.warning ? colors.warningText : colors.accent,
              },
            ]}
          >
            ● {pet.status}
          </AppText>
        </AppView>
        <AppView
          style={[styles.badge, { backgroundColor: colors.surface }]}
        >
          <AppIcon name="calendar" color={colors.muted} size={13} />
          <AppText style={styles.badgeText}>{pet.reminder}</AppText>
        </AppView>
      </AppView>
      <AppView style={[styles.weight, { backgroundColor: colors.surface }]}>
        <AppText style={styles.badgeText}>Berat Terakhir</AppText>
        <AppText style={styles.weightValue}>{pet.weight}</AppText>
      </AppView>
    </Card>

  );
}

const styles = StyleSheet.create({
  petCard: { borderWidth: 0, padding: 16, borderRadius: 20, gap: 12 },
  shadow: {
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 2,
  },
  petHeading: { flexDirection: "row", alignItems: "center", gap: 10 },
  flex: { flex: 1, minWidth: 0 },
  petName: { fontSize: 21, lineHeight: 28 },
  small: { fontSize: 12, lineHeight: 18 },
  badges: { alignItems: "flex-start", gap: 4 },
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
  weightValue: { fontSize: 12, lineHeight: 17, fontFamily: Fonts.bold },
})
