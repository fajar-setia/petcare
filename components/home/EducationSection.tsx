
import { Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { AppView, AppText, AppIcon, Photo } from "../theme";
import { useTheme } from "../../providers/ThemeProvider";
import { Fonts } from "../../constants/typography";
import { showFeature } from "../../utils/feature";
import { articles } from "../../constants/homeData";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function EducationSection() {

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const articleWidth = Math.min(
    288,
    Math.max(220, (width - insets.left - insets.right) * 0.72),
  );

  const { colors, isDark } = useTheme();

  const card = {
    backgroundColor: colors.surfaceRaised,
    shadowColor: colors.neutral,
    shadowOpacity: isDark ? 0 : 0.09,
  };


  return (
    <>
      <AppView style={styles.sectionHeader}>
        <AppView style={styles.inline}>
          <AppIcon name="book" color={colors.warningText} size={21} />
          <AppText variant="subtitle" style={styles.sectionTitle}>
            Tips & Edukasi Sehat
          </AppText>
        </AppView>
        <Pressable
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => showFeature("Semua artikel")}
        >
          <AppText style={[styles.link, { color: colors.accent }]}>
            Semua
          </AppText>
        </Pressable>
      </AppView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
      >
        {articles.map((article) => (
          <Pressable
            key={article.title}
            accessibilityRole="button"
            onPress={() => showFeature(article.title)}
            style={[
              styles.article,
              styles.shadow,
              card,
              { width: articleWidth - 20 },
            ]}
          >
            <AppView>
              <Photo uri={article.photo} label={article.category} wide />
              <AppView
                style={[
                  styles.category,
                  { backgroundColor: colors.surfaceRaised },
                ]}
              >
                <AppText style={[styles.badgeText, { color: colors.accent }]}>
                  {article.category}
                </AppText>
              </AppView>
            </AppView>
            <AppView style={styles.articleBody}>
              <AppText variant="subtitle" style={styles.articleTitle}>
                {article.title}
              </AppText>
              <AppView style={styles.sectionHeaderCompact}>
                <AppText variant="caption" style={styles.small}>
                  Baca {article.duration} mnt
                </AppText>
                <AppIcon name="arrow" color={colors.accent} size={18} />
              </AppView>
            </AppView>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  sectionTitle: { fontSize: 19, lineHeight: 25 },
  inline: { flexDirection: "row", alignItems: "center", gap: 6, flexShrink: 1 },
  link: { fontSize: 13, fontFamily: Fonts.semiBold },
  carousel: { marginHorizontal: -20 },
  carouselContent: { paddingHorizontal: 20, paddingBottom: 6, gap: 16 },
  shadow: {
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 2,
  },
  article: { borderRadius: 18 },
  category: {
    position: "absolute",
    top: 8,
    left: 10,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  articleBody: { padding: 10, gap: 8 },
  articleTitle: { fontSize: 15, lineHeight: 21 },
  badgeText: { fontSize: 11, lineHeight: 17, fontFamily: Fonts.semiBold },
  sectionHeaderCompact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  small: { fontSize: 12, lineHeight: 18 },
})
