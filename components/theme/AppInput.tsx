import { TextInput, StyleSheet, type TextInputProps } from "react-native";
import { Fonts } from "../../constants/typography";
import { useTheme } from "../../providers/ThemeProvider";

export function AppInput({ style, placeholderTextColor, ...props }: TextInputProps) {
  const { colors } = useTheme();
  return (
    <TextInput
      {...props}
      placeholderTextColor={placeholderTextColor ?? colors.muted}
      style={[styles.input, { color: colors.text }, style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 16,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});
