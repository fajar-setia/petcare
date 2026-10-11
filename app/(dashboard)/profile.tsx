
import {StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AppText,
  AppView,
  Screen,
} from "../../components/theme";
import { useTheme} from "../../providers/ThemeProvider";
import { Fonts } from "../../constants/typography";
import {
  AppearanceSettings,
  MyPetsSection,
  ProfileHeader,
  ProfileIdentityCard,
  ProfileMenuGroup,
} from "../../components/profile";
import { settings } from "../../constants/profileData";


export default function ProfilePage() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const background = isDark ? colors.background : "#F4FBF2";
  return (
    <>
      <Screen
        edges={["left", "right"]}
        style={{ backgroundColor: background }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: insets.bottom + 115,
          },
        ]}
      >
        <ProfileHeader />

        <ProfileIdentityCard />

        <MyPetsSection />

        <ProfileMenuGroup title="PENGATURAN AKUN & LAYANAN" items={settings} />

        <AppearanceSettings/>

        <AppView style={styles.footer}>
          <AppText color="muted" style={styles.footerText}>
            PawCare App v3.4.1 (Build 2024)
          </AppText>
          <AppText style={[styles.footerText, { color: colors.border }]}>
            Sahabat Sehat Peliharaan Indonesia
          </AppText>
        </AppView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  flex: { flex: 1, minWidth: 0 },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexWrap: "wrap",
  },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
  },
  identityCard: {
    borderRadius: 20,
    padding: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  leaf: { position: "absolute", right: 13, top: 19, opacity: 0.7 },
  identityRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarRing: { padding: 4, borderRadius: 45 },
  verified: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#167525",
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  accountName: { fontFamily: Fonts.bold, fontSize: 20, lineHeight: 26 },
  membership: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
    marginVertical: 3,
  },
  badgeText: { fontSize: 12, lineHeight: 18 },
  parentLine: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    flexWrap: "wrap",
  },
  contactBox: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 14,
    gap: 5,
  },
  contactLine: { flexDirection: "row", gap: 10, alignItems: "center" },
  description: { fontSize: 12, lineHeight: 18, flexShrink: 1 },
  dedication: {
    backgroundColor: "#226C29",
    borderColor: "#126019",
    borderWidth: 1,
    borderRadius: 17,
    padding: 16,
    marginBottom: 24,
  },
  dedicationTitle: {
    fontSize: 12,
    color: "#F1FFE8",
    fontFamily: Fonts.semiBold,
  },
  year: {
    backgroundColor: "#216225",
    color: "#F1FFE8",
    fontFamily: Fonts.bold,
    fontSize: 11,
    lineHeight: 18,
    borderRadius: 9,
    paddingHorizontal: 8,
  },
  stats: { flexDirection: "row", marginTop: 12 },
  stat: { flex: 1, alignItems: "center", paddingHorizontal: 5 },
  statDivider: { borderLeftWidth: 1, borderLeftColor: "#438449" },
  statValue: {
    fontSize: 23,
    lineHeight: 28,
    fontFamily: Fonts.bold,
    color: "#F4FFDC",
  },
  statLabel: {
    fontSize: 11,
    lineHeight: 14,
    color: "#F4FFDC",
    textAlign: "center",
    fontFamily: Fonts.bold,
  },
  sectionTitle: { fontFamily: Fonts.semiBold, fontSize: 18, lineHeight: 26 },
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
  groupLabel: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.8,
    marginTop: 23,
    marginBottom: 5,
    marginLeft: 4,
    fontFamily: Fonts.semiBold,
  },
  menuGroup: { borderRadius: 19, paddingVertical: 1, overflow: "hidden" },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    minHeight: 71,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.semiBold,
    flexShrink: 1,
  },
  appearance: { padding: 16, borderRadius: 18, gap: 10, marginTop: 16 },
  footer: { alignItems: "center", paddingTop: 28, paddingBottom: 32 },
  footerText: { fontSize: 12, lineHeight: 18, textAlign: "center" },
});
