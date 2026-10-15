import { Pressable, type PressableProps } from "react-native";
import { AppText } from "./AppText";
import { useTheme } from "../../providers/ThemeProvider";
import { type ReactNode } from "react";

type Props = Omit<PressableProps, "children"> & {
  variant?: "primary" | "secondary" | "outline" | "plain";
} & ({ title: string; children?: never } | { title?: never; children: ReactNode });
export function Button({
  title,
  children,
  variant = "primary",
  disabled,
  style,
  ...props
}: Props) {
  const { colors } = useTheme();
  const backgroundColor =
    variant === "outline" || variant === "plain" ? "transparent" : colors[variant];
  const color =
    variant === "primary"
      ? colors.onPrimary
      : variant === "secondary"
        ? colors.onSecondary
        : colors.accent;
  return (
    <Pressable
      {...props}
      accessibilityRole={props.accessibilityRole ?? "button"}
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
        variant === "plain" && {
          borderWidth: 0,
          borderRadius: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
          minHeight: 0,
          alignItems: "stretch",
          justifyContent: "flex-start",
        },
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {children ?? <AppText style={{ color, fontWeight: "600", textAlign: "center" }}>
        {title}
      </AppText>}
    </Pressable>
  );
}
