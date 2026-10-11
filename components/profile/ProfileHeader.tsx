import { AppView, AppText, AppIcon, Photo } from "../theme";
import { useTheme } from "../../providers/ThemeProvider";
import { account } from "../../constants/profileData";
import { pets } from "../../constants/homeData";
import { StyleSheet } from "react-native";
import { Fonts } from "../../constants/typography";

export function ProfileHeader() {
  const {colors, isDark} = useTheme();

  const surface = { backgroundColor: colors.surfaceRaised };
  const soft = { backgroundColor: isDark ? colors.accentSoft : "#EEF5EC" };
  return (
    <AppView style={[styles.identityCard, surface]}>
      <AppView pointerEvents="none" style={styles.leaf}>
        <AppIcon name="leaf" size={85} color={isDark ? "#304D32" : "#D9EFD5"} />
      </AppView>
      <AppView style={styles.identityRow}>
        <AppView>
          <AppView style={[styles.avatarRing, soft]}>
            <Photo uri={account.photo} label={account.name} size={74} />
          </AppView>
          <AppView
            style={[styles.verified, { borderColor: colors.surfaceRaised }]}
          >
            <AppIcon name="badge" size={14} color="#FFFFFF" />
          </AppView>
        </AppView>
        <AppView style={styles.flex}>
          <AppText style={styles.accountName}>{account.name}</AppText>
          <AppView
            style={[styles.membership, { backgroundColor: colors.warningSoft }]}
          >
            <AppIcon name="star" size={13} color={colors.warningText} />
            <AppText style={[styles.badgeText, { color: colors.warningText }]}>
              PawCare VIP Member
            </AppText>
          </AppView>
          <AppView style={styles.parentLine}>
            <AppIcon name="paw" size={14} color={colors.accent} />
            <AppText style={styles.description}>
              Pet Parent of {pets.length} (
              {pets.map((pet) => pet.name).join(" & ")})
            </AppText>
          </AppView>
        </AppView>
      </AppView>
      <AppView style={[styles.contactBox, soft]}>
        <AppView style={styles.contactLine}>
          <AppIcon name="mail" size={15} color={colors.accent} />
          <AppText selectable style={styles.description}>
            {account.email}
          </AppText>
        </AppView>
        <AppView style={styles.contactLine}>
          <AppIcon name="phone" size={15} color={colors.accent} />
          <AppText selectable style={styles.description}>
            {account.phone}
          </AppText>
        </AppView>
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
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
  flex: { flex: 1, minWidth: 0 },
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
})
