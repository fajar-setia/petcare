import { Pressable, type PressableProps } from "react-native";
import { AppText } from "./AppText";
import { useTheme } from "../../providers/ThemeProvider";

type Props = Omit<PressableProps, "children"> & {
  title: string;
  variant?: "primary" | "secondary" | "outline";
};
export function Button({
  title,
  variant = "primary",
  disabled,
  style,
  ...props
}: Props) {
  const { colors } = useTheme();
  const backgroundColor =
    variant === "outline" ? "transparent" : colors[variant];
  const color =
    variant === "primary"
      ? colors.onPrimary
      : variant === "secondary"
        ? colors.onSecondary
        : colors.accent;
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      disabled={disabled}
      accessibilityState={{ ...props.accessibilityState, disabled: !!disabled }}
      style={(state) => [
        {
          backgroundColor,
          borderColor: variant === "outline" ? colors.accent : backgroundColor,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          minHeight: 48,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.45 : state.pressed ? 0.75 : 1,
        },
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <AppText style={{ color, fontWeight: "600", textAlign: "center" }}>
        {title}
      </AppText>
    </Pressable>
  );
}
