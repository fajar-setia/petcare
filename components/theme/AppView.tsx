import { View, type ViewProps } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";

type Props = ViewProps & {
  background?: "background" | "surface" | "transparent";
  padding?: number;
  gap?: number;
  row?: boolean;
};

export function AppView({
  background = "transparent",
  padding = 0,
  gap = 0,
  row = false,
  style,
  ...props
}: Props) {
  const { colors } = useTheme();
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor:
            background === "transparent" ? "transparent" : colors[background],
          padding,
          gap,
          flexDirection: row ? "row" : "column",
        },
        style,
      ]}
    />
  );
}
