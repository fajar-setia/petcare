import { AppView } from "./AppView";
import { Host, Icon } from "@expo/ui";
import {
  type ColorValue,
  type StyleProp,
  type ViewStyle,
} from "react-native";

const icons = {
  bell: Icon.select({
    ios: "bell",
    android: import("@expo/material-symbols/notifications.xml"),
  }),
  mail: Icon.select({
    ios: "envelope",
    android: import("@expo/material-symbols/mail.xml"),
  }),
  phone: Icon.select({
    ios: "phone",
    android: import("@expo/material-symbols/call.xml"),
  }),
  paw: Icon.select({
    ios: "pawprint.fill",
    android: import("@expo/material-symbols/pets.xml"),
  }),
  badge: Icon.select({
    ios: "checkmark.seal",
    android: import("@expo/material-symbols/verified.xml"),
  }),
  shield: Icon.select({
    ios: "cross.case",
    android: import("@expo/material-symbols/health_and_safety.xml"),
  }),
  wallet: Icon.select({
    ios: "wallet.bifold",
    android: import("@expo/material-symbols/account_balance_wallet.xml"),
  }),
  support: Icon.select({
    ios: "headphones",
    android: import("@expo/material-symbols/support_agent.xml"),
  }),
  community: Icon.select({
    ios: "person.3",
    android: import("@expo/material-symbols/groups.xml"),
  }),
  privacy: Icon.select({
    ios: "lock.shield",
    android: import("@expo/material-symbols/lock.xml"),
  }),
  logout: Icon.select({
    ios: "rectangle.portrait.and.arrow.right",
    android: import("@expo/material-symbols/logout.xml"),
  }),
  add: Icon.select({
    ios: "plus.circle",
    android: import("@expo/material-symbols/add_circle.xml"),
  }),
  contact: Icon.select({
    ios: "person.text.rectangle",
    android: import("@expo/material-symbols/contact_emergency.xml"),
  }),
  leaf: Icon.select({
    ios: "leaf",
    android: import("@expo/material-symbols/spa.xml"),
  }),
  star: Icon.select({
    ios: "star",
    android: import("@expo/material-symbols/star.xml"),
  }),
  heart: Icon.select({
    ios: "heart",
    android: import("@expo/material-symbols/favorite.xml"),
  }),
  chevron: Icon.select({
    ios: "chevron.right",
    android: import("@expo/material-symbols/chevron_right.xml"),
  }),

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
     <AppView style={style}>
      <Host matchContents>
        <Icon
          name={icons[name]}
          size={size}
          color={color}
        />
      </Host>
    </AppView>
  );
}