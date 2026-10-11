import { Pressable, StyleSheet } from "react-native";
import { AppView, AppText, AppIcon } from "../theme";
import type { AppIconName } from "../theme/AppIcon";
import { useTheme } from "../../providers/ThemeProvider";
import { showFeature } from "../../utils/feature";
import { Fonts } from "../../constants/typography";

export type MenuItem = {
  icon: AppIconName;
  title: string;
  description?: string;
  badge?: string;
  tone?: "warm" | "danger";
  onPress?: () => void;
};

export function MenuRow({ item }: { item: MenuItem }) {
  const { colors, isDark } = useTheme();

  const danger = item.tone === "danger";

  const color = danger
    ? isDark
      ? "#FF9696"
      : "#D60000"
    : item.tone === "warm"
      ? colors.warningText
      : colors.accent;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      onPress={item.onPress ?? (() => showFeature(item.title))}
      style={({ pressed }) => [
        styles.menuRow,
        { opacity: pressed ? 0.65 : 1 },
      ]}
    >
      <AppView
        style={[
          styles.menuIcon,
          {
            backgroundColor: danger
              ? isDark
                ? "#482929"
                : "#FFECE8"
              : item.tone === "warm"
                ? colors.warningSoft
                : isDark
                  ? colors.accentSoft
                  : "#EEF5EC",
          },
        ]}
      >
        <AppIcon name={item.icon} size={22} color={color} />
      </AppView>

      <AppView style={styles.flex}>
        <AppText
          numberOfLines={1}
          style={[styles.menuTitle, danger && { color }]}
        >
          {item.title}
        </AppText>

        {item.description && (
          <AppText
            numberOfLines={1}
            color="muted"
            style={styles.description}
          >
            {item.description}
          </AppText>
        )}
      </AppView>

      {item.badge && (
        <AppView
          style={[
            styles.pill,
            {
              backgroundColor:
                item.tone === "warm"
                  ? isDark
                    ? colors.accentSoft
                    : "#AAF29B"
                  : isDark
                    ? colors.accentSoft
                    : "#EAF0E6",
            },
          ]}
        >
          <AppText style={styles.badgeText}>
            {item.badge}
          </AppText>
        </AppView>
      )}

      <AppIcon
        name="chevron"
        size={17}
        color={danger ? color : colors.border}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
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

  flex: {
    flex: 1,
    minWidth: 0,
  },

  menuTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.semiBold,
    flexShrink: 1,
  },

  description: {
    fontSize: 12,
    lineHeight: 18,
    flexShrink: 1,
  },

  pill: {
    borderRadius: 12,
    paddingHorizontal: 8,
  },

  badgeText: {
    fontSize: 12,
    lineHeight: 18,
  },
});