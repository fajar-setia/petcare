import { Host, Icon } from "@expo/ui";
import type { ColorValue } from "react-native";

const icons = {
  home: Icon.select({
    ios: "house.fill",
    android: import("@expo/material-symbols/home.xml"),
  }),

  care: Icon.select({
    ios: "heart.fill",
    android: import("@expo/material-symbols/favorite.xml"),
  }),

  clinic: Icon.select({
    ios: "cross.case.fill",
    android: import("@expo/material-symbols/medical_services.xml"),
  }),

  profile: Icon.select({
    ios: "person.fill",
    android: import("@expo/material-symbols/person.xml"),
  }),
};

export type AppIconName = keyof typeof icons;

type Props = {
  name: AppIconName;
  size?: number;
  color?: ColorValue;
};

export function AppIcon({
  name,
  size = 14,
  color,
}: Props) {
  return (
    <Host matchContents>
      <Icon
        name={icons[name]}
        size={size}
        color={color}
      />
    </Host>
  );
}