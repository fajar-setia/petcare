import { useSafeAreaInsets } from "react-native-safe-area-context";
import { pets } from "../../constants/homeData";
import { PetCard } from "./PetCard";
import { AppText, AppView } from "../theme";
import { Pressable, ScrollView, useWindowDimensions } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { StyleSheet } from "react-native";
import { showFeature } from "../../utils/feature";
import { Fonts } from "../../constants/typography";

export function PetSection() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const petWidth = Math.min(288, Math.max(220, (width - insets.left - insets.right) * 0.72));
  return (
    <>
      <AppView style={styles.sectionHeader}>
        <AppText variant="subtitle" style={styles.sectionTitle}>
          Peliharaan Saya
        </AppText>
        <Pressable
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => showFeature("Kelola peliharaan")}
        >
          <AppText style={[styles.link, { color: colors.accent }]}>
            Kelola ({pets.length})
          </AppText>
        </Pressable>
      </AppView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel} contentContainerStyle={styles.carouselContent}>
        {pets.map((pet) => <PetCard key={pet.id} pet={pet} width={petWidth} />)}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  carousel: { marginHorizontal: -20 },
  carouselContent: { paddingHorizontal: 20, gap: 12 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  sectionTitle: { fontSize: 19, lineHeight: 25 },
  link: { fontSize: 13, fontFamily: Fonts.semiBold },
})
