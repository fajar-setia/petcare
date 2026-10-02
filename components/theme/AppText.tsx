import { Text, StyleSheet, type TextProps } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";

type Props = TextProps & {
  variant?: "title" | "subtitle" | "body" | "caption";
  color?: "text" | "muted" | "accent";
};
export function AppText({
  variant = "body",
  color = "text",
  style,
  ...props
}: Props) {
  const { colors } = useTheme();
  return (
    <Text
      {...props}
      style={[styles[variant], { color: colors[color] }, style]}
    />
  );
}
const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "700", lineHeight: 36 },
  subtitle: { fontSize: 20, fontWeight: "600", lineHeight: 28 },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 14, lineHeight: 20 },
});
