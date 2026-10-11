import {AppView, AppText, AppIcon, Photo} from "../theme"
import { StyleSheet, Pressable } from "react-native";
import {Fonts} from "../../constants/typography"
import { pets } from "../../constants/homeData";
import { useTheme } from "../../providers/ThemeProvider";
import { showFeature } from "../../utils/feature";

export function MyPetsSection() {
  const {colors, isDark} = useTheme();
  const surface = { backgroundColor: colors.surfaceRaised }; 
  const soft = { backgroundColor: isDark ? colors.accentSoft : "#EEF5EC" };
  return (
    <>
      <AppView style={styles.between}>
        <AppText style={styles.sectionTitle}>Anabul Saya</AppText>
        <AppText color="accent" style={styles.badgeText}>
          {pets.length} Terdaftar
        </AppText>
      </AppView>
      <AppView style={styles.petList}>
        {pets.map((pet) => (
          <AppView key={pet.id} style={[styles.petCard, surface]}>
            <AppView>
              <Photo
                uri={pet.photo}
                label={pet.name}
                size={56}
                rounded={false}
              />
              <AppView
                style={[
                  styles.activeDot,
                  { borderColor: colors.surfaceRaised },
                ]}
              />
            </AppView>
            <AppView style={styles.flex}>
              <AppView style={styles.inline}>
                <AppText style={styles.petName}>{pet.name}</AppText>
                <AppView style={[styles.pill, soft]}>
                  <AppText color="accent" style={styles.badgeText}>
                    Aktif
                  </AppText>
                </AppView>
              </AppView>
              <AppText style={styles.description} color="muted">
                {pet.breed} • {pet.age}
              </AppText>
            </AppView>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Kelola ${pet.name}`}
              onPress={() => showFeature(`Kelola ${pet.name}`)}
              style={({ pressed }) => [
                styles.manage,
                soft,
                { opacity: pressed ? 0.65 : 1 },
              ]}
            >
              <AppText color="accent" style={styles.badgeText}>
                Kelola
              </AppText>
              <AppIcon name="chevron" size={14} color={colors.accent} />
            </Pressable>
          </AppView>
        ))}
      </AppView>
      <Pressable
        accessibilityRole="button"
        onPress={() => showFeature("Daftarkan hewan peliharaan baru")}
        style={({ pressed }) => [
          styles.addPet,
          soft,
          { opacity: pressed ? 0.65 : 1 },
        ]}
      >
        <AppIcon name="add" size={20} color={colors.accent} />
        <AppText color="accent" style={styles.menuTitle}>
          Daftarkan Hewan Peliharaan Baru
        </AppText>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create ({
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
  },
  sectionTitle: { fontFamily: Fonts.semiBold, fontSize: 18, lineHeight: 26 },
  badgeText: { fontSize: 12, lineHeight: 18 },
  petList: { gap: 9, marginTop: 8 },
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 20,
  },
  activeDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: "#25862A",
  },
  petName: { fontFamily: Fonts.bold, fontSize: 15 },
  pill: { borderRadius: 12, paddingHorizontal: 8 },
   flex: { flex: 1, minWidth: 0 },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexWrap: "wrap",
  },
  description: { fontSize: 12, lineHeight: 18, flexShrink: 1 },
  manage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  addPet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 18,
    minHeight: 46,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  menuTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.semiBold,
    flexShrink: 1,
  },
})
