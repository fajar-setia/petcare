import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useTheme } from "../../providers/ThemeProvider";
import { AppIcon, AppText } from "../theme";
import { tabs } from "../../constants/tabs";
import { Fonts } from "../../constants/typography";

type TabsProps = ComponentProps<typeof Tabs>;

type PawCareTabBarProps = Parameters<
  NonNullable<TabsProps["tabBar"]>
>[0];

export function PawCareTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: PawCareTabBarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          bottom: insets.bottom + 7,
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const tab = tabs.find(
          (item) => item.name === route.name
        );

        if (!tab) return null;

        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityRole="button"
            accessibilityState={
              isFocused ? { selected: true } : {}
            }
            accessibilityLabel={
              options.tabBarAccessibilityLabel ?? tab.title
            }
            style={[
              styles.tabItem,
              isFocused && {
                flex: 1.7,
                backgroundColor: colors.accent,
              },
            ]}
          >
            <AppIcon
              name={tab.icon}
              size={20}
              color={
                isFocused
                  ? colors.surface
                  : colors.muted
              }
            />

            {isFocused && <AppText
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: isFocused
                    ? colors.surface
                    : colors.muted,
                },
              ]}
            >
              {tab.title}
            </AppText>}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: "10%",
    right: "10%",

    height: 65,

    flexDirection: "row",
    alignItems: "center",

    padding: 7,

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

  tabItem: {
    flex: 1,
    height: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 5,

    borderRadius: 28,
  },

  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
  },
});
