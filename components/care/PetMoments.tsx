import { AppIcon, AppText, AppView, Photo } from "../theme";
import { Pressable, StyleSheet } from "react-native";
import { showFeature } from "../../utils/feature";
import { moments } from "../../constants/careData";
import { useTheme } from "../../providers/ThemeProvider";
import { Fonts } from "../../constants/typography";

export function PetMoments() {
  const {colors} = useTheme()
  return (
    <AppView gap={10}>
      <AppView row gap={8} style={styles.center}>
        <AppIcon name="book" size={20} color={colors.warningText} />
        <AppText style={[styles.heading, styles.flex]}>
          Momen Terbaru Mochi
        </AppText>
        <Pressable
          accessibilityRole="button"
          onPress={() => showFeature("Galeri Mochi")}
          style={styles.smallAction}
        >
          <AppText style={[styles.small, { color: colors.accent }]}>
            Lihat Semua
          </AppText>
        </Pressable>
      </AppView>
      <AppView row gap={10}>
        {moments.map((moment) => (
          <Pressable
            key={moment.title}
            accessibilityRole="button"
            accessibilityLabel={`Lihat foto ${moment.title}`}
            onPress={() => showFeature(moment.title)}
            style={styles.moment}
          >
            <Photo uri={moment.photo} label={moment.title} wide />
            <AppText style={styles.photoLabel}>{moment.title}</AppText>
          </Pressable>
        ))}
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center" },
  heading: { fontSize: 19, lineHeight: 25, fontFamily: Fonts.brandMedium },
   flex: { flex: 1, minWidth: 0 },
   smallAction: {
    minHeight: 36,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  small: { fontSize: 11, lineHeight: 16, fontFamily: Fonts.semiBold },
  moment: { flex: 1, borderRadius: 16, overflow: "hidden" },
  photoLabel: {
      position: "absolute",
      left: 8,
      bottom: 8,
      color: "#FFFFFF",
      backgroundColor: "rgba(30,40,27,0.55)",
      borderRadius: 10,
      overflow: "hidden",
      paddingHorizontal: 8,
      fontSize: 11,
      lineHeight: 19,
      fontFamily: Fonts.bold,
    },
})
