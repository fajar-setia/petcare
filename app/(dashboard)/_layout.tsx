import { Tabs } from "expo-router";
import { useTheme } from "../../providers/ThemeProvider";
import {Dimensions} from "react-native";
import {TopBarLogo, TabBarBackground} from "../../components/navigation";
import { tabs } from "../../constants/tabs";
import { AppIcon } from "../../components/theme";

import { Fonts } from "../../constants/typography"

const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_WIDTH = SCREEN_WIDTH * 0.80;
const TAB_MARGIN = (SCREEN_WIDTH - TAB_WIDTH) / 2;

export default function DashboardLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },

        headerTintColor: colors.text,

        headerLeftContainerStyle: {
          paddingLeft: 20,
        },

        sceneStyle: {
          backgroundColor: colors.background,
        },

        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          width: TAB_WIDTH,
          marginLeft: TAB_MARGIN,
          height: 68,
          backgroundColor: "transparent",
          borderRadius: 36,
          borderWidth: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.12,
          shadowRadius: 10,
          elevation: 8,
        },

        tabBarBackground: () => <TabBarBackground />,

        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,

        tabBarLabelStyle: {
          fontSize: 9,
           fontFamily: Fonts.medium,
          marginTop: 2,
        },

        tabBarItemStyle: {
          paddingVertical: 5,
        },

        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerTitle: "",

            headerLeft: () => <TopBarLogo subtitle={tab.title} />,

            tabBarIcon: ({ color, size }) => (
              <AppIcon name={tab.icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
