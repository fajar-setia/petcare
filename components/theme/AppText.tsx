import { Text, StyleSheet, type TextProps } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { Fonts } from "../../constants/typography";

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
      style={[
        styles[variant],
        { color: colors[color] },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 28,
    lineHeight: 36,
  },

  subtitle: {
    fontFamily: Fonts.brandSemiBold,
    fontSize: 20,
    lineHeight: 28,
  },

  body: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },

  caption: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
});