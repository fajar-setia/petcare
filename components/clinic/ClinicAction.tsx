import { Pressable, StyleSheet } from "react-native";
import { AppIcon, AppText } from "../theme";
import type { AppIconName } from "../theme/AppIcon";
import { useTheme } from "../../providers/ThemeProvider";
import { Fonts } from "../../constants/typography";

type ClinicActionProps = {
  title?: string;
  icon?: AppIconName;
  onPress: () => void;
  secondary?: boolean;
  danger?: boolean;
  compact?: boolean;
};

export function ClinicAction({
  title,
  icon,
  onPress,
  secondary = false,
  danger = false,
  compact = false,
}: ClinicActionProps) {
  const { colors } = useTheme();

  const foreground = danger
    ? "#FFFFFF"
    : secondary
      ? colors.accent
      : colors.onPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title || "Lihat arah ke klinik"}
      onPress={onPress}
      style={({ pressed }) => [
        styles.action,
        !compact && styles.flex,
        {
          backgroundColor: danger
            ? "#C90D16"
            : secondary
              ? colors.surface
              : colors.primary,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      {icon && (
        <AppIcon
          name={icon}
          size={16}
          color={foreground}
        />
      )}

      {title && (
        <AppText
          style={[
            styles.actionText,
            { color: foreground },
          ]}
        >
          {title}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  action: {
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  actionText: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Fonts.bold,
    textAlign: "center",
    flexShrink: 1,
  },
});