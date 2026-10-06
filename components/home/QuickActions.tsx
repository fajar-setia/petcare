import { Pressable, StyleSheet } from "react-native";
import { AppIcon, AppText, AppView } from "../theme";
import { useTheme } from "../../providers/ThemeProvider";
import { Fonts } from "../../constants/typography";
import { showFeature } from "../../utils/feature";
import { AppIconName } from "../theme/AppIcon";

type QuickAction = {
  icon: AppIconName;
  title: string;
}

const quickActions: QuickAction[] = [
  {
    icon: "clinic",
    title: "Konsultasi\nDokter",
  },
  {
    icon: "grooming",
    title: "Booking\nGrooming",
  },
  {
    icon: "medicine",
    title: "Pengingat\nObat",
  },
  {
    icon: "record",
    title: "Catatan\nMedis",
  },
];

export function QuickActions() {
  const { colors } = useTheme();
  return (
    <AppView style={styles.quickActions}>
      {quickActions.map((action) => (
        <Pressable
          key={action.icon}
          accessibilityRole="button"
          onPress={() => showFeature(action.title.replace("\n", " "))}
          style={styles.quickAction}
        >
          <AppView
            style={[
              styles.quickIcon,
              { backgroundColor: colors.surfaceRaised },
            ]}
          >
            <AppIcon
              name={action.icon}
              size={28}
              color={
                action.icon === "grooming" ? colors.secondary : colors.accent
              }
            />
          </AppView>
          <AppText style={styles.quickLabel}>{action.title}</AppText>
        </Pressable>
      ))}
    </AppView>
  );
}

const styles = StyleSheet.create({
  quickActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
      marginVertical: 24,
    },
    quickAction: { flex: 1, alignItems: "center", gap: 6 },
    quickIcon: {
      width: 58,
      height: 58,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    quickLabel: {
      fontSize: 12,
      lineHeight: 16,
      textAlign: "center",
      fontFamily: Fonts.semiBold,
    },
})


