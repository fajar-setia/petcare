import { Card, AppText, AppView, AppIcon, Photo } from "../theme";
import { Pressable, StyleSheet } from "react-native";
import { showFeature } from "../../utils/feature";
import { photos } from "../../constants/homeData";
import { useTheme } from "../../providers/ThemeProvider";
import { Fonts } from "../../constants/typography";

export function PetProfileCard() {
  const { colors } = useTheme();

  const surface = { backgroundColor: colors.surfaceRaised };
  return (
    <Card style={[styles.profile, surface]}>
      <AppView row gap={16} style={styles.center}>
        <AppView>
          <Photo
            uri={photos.cat}
            label="Mochi, British Shorthair"
            size={92}
            rounded={false}
          />
          <AppView
            style={[
              styles.paw,
              {
                backgroundColor: colors.primary,
                borderColor: colors.surfaceRaised,
              },
            ]}
          >
            <AppIcon name="paw" size={17} color={colors.onPrimary} />
          </AppView>
        </AppView>
        <AppView style={styles.flex} gap={3}>
          <AppView row style={styles.between} gap={6}>
            <AppText variant="subtitle" style={styles.petName}>
              Mochi
            </AppText>
            <AppText
              style={[
                styles.badge,
                {
                  backgroundColor: colors.warningSoft,
                  color: colors.warningText,
                },
              ]}
            >
              ● Aktif
            </AppText>
          </AppView>
          <AppText style={styles.body}>British Shorthair (Abu-abu)</AppText>
          <AppView row gap={6} style={styles.wrap}>
            <AppText
              style={[
                styles.badge,
                { backgroundColor: colors.surface, color: colors.accent },
              ]}
            >
              1 Thn 5 Bln
            </AppText>
            <AppText
              style={[styles.badge, { backgroundColor: colors.surface }]}
            >
              ♂ Steril
            </AppText>
          </AppView>
        </AppView>
      </AppView>
      <AppView
        row
        gap={8}
        style={[styles.microchip, { backgroundColor: colors.surface }]}
      >
        <AppIcon name="privacy" size={16} color={colors.muted} />
        <AppText selectable style={[styles.small, styles.flex]}>
          Microchip ID: #PC-88219
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Salin ID microchip"
          onPress={() => showFeature("Salin ID microchip")}
          style={styles.smallAction}
        >
          <AppIcon name="record" size={14} color={colors.accent} />
          <AppText style={[styles.small, { color: colors.accent }]}>
            Salin
          </AppText>
        </Pressable>
      </AppView>
    </Card>
  );
}

const styles = StyleSheet.create({
  profile: { borderWidth: 0, borderRadius: 24, padding: 16, gap: 18 },
  center: { alignItems: "center" },
  paw: {
    position: "absolute",
    right: -6,
    bottom: -6,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1, minWidth: 0 },
  between: { alignItems: "center", justifyContent: "space-between" },
  petName: { fontSize: 23, lineHeight: 29 },
  badge: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.semiBold,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  body: { fontSize: 14, lineHeight: 20 },
  small: { fontSize: 11, lineHeight: 16, fontFamily: Fonts.semiBold },
  wrap: { flexWrap: "wrap" },
  microchip: {
    borderRadius: 13,
    paddingHorizontal: 12,
    minHeight: 42,
    alignItems: "center",
  },
  smallAction: {
    minHeight: 36,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
