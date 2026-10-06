import { Host, Icon } from "@expo/ui";
import {
  View,
  type ColorValue,
  type StyleProp,
  type ViewStyle,
} from "react-native";

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

  check: Icon.select({
    ios: "checkmark",
    android: import("@expo/material-symbols/check.xml"),
  }),
  health: Icon.select({
    ios: "checkmark.seal",
    android: import("@expo/material-symbols/verified.xml"),
  }),
  grooming: Icon.select({
    ios: "scissors",
    android: import("@expo/material-symbols/content_cut.xml"),
  }),
  medicine: Icon.select({
    ios: "pills",
    android: import("@expo/material-symbols/medication.xml"),
  }),
  record: Icon.select({
    ios: "doc.text",
    android: import("@expo/material-symbols/description.xml"),
  }),
  calendar: Icon.select({
    ios: "calendar",
    android: import("@expo/material-symbols/calendar_month.xml"),
  }),
  book: Icon.select({
    ios: "book",
    android: import("@expo/material-symbols/menu_book.xml"),
  }),
  chat: Icon.select({
    ios: "text.bubble",
    android: import("@expo/material-symbols/chat.xml"),
  }),
  arrow: Icon.select({
    ios: "arrow.right",
    android: import("@expo/material-symbols/arrow_forward.xml"),
  }),
};

export type AppIconName = keyof typeof icons;

type Props = {
  name: AppIconName;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export function AppIcon({
  name,
  size = 14,
  color,
  style,
}: Props) {
  return (
     <View style={style}>
      <Host matchContents>
        <Icon
          name={icons[name]}
          size={size}
          color={color}
        />
      </Host>
    </View>
  );
}