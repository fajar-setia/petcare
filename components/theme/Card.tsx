import { type ViewProps } from "react-native";
import { AppView } from "./AppView";
import { useTheme } from "../../providers/ThemeProvider";

export function Card({ style, ...props }: ViewProps) {
  const { colors } = useTheme();
  return (
    <AppView
      {...props}
      background="surface"
      padding={16}
      gap={8}
      style={[
        { borderRadius: 12, borderWidth: 1, borderColor: colors.border },
        style,
      ]}
    />
  );
}
