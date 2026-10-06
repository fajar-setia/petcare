import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {TopBarLogo, PawCareTabBar} from "../../components/navigation";

import { tabs } from "../../constants/tabs";
import { useTheme } from "../../providers/ThemeProvider";

export default function DashboardLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => (
        <PawCareTabBar {...props} />
      )}
      screenOptions={{
        headerStatusBarHeight: insets.top,
        headerStyle: {
          height: insets.top + 60,
          backgroundColor: colors.surface,
        },

        headerTintColor: colors.text,

        headerLeftContainerStyle: {
          paddingLeft: Math.max(insets.left, 20),
        },

        sceneStyle: {
          backgroundColor: colors.background,
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

            headerLeft: () => (
              <TopBarLogo subtitle={tab.title} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
