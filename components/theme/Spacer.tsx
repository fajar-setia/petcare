import { View } from "react-native";

export function Spacer({
  size = 16,
  horizontal = false,
}: {
  size?: number;
  horizontal?: boolean;
}) {
  return (
    <View
      accessible={false}
      style={
        horizontal
          ? { width: size, flexShrink: 0 }
          : { height: size, flexShrink: 0 }
      }
    />
  );
}
