import { AppView, AppText } from "../theme";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { sections, type CareSection } from "../../constants/careData";
import { Fonts } from "../../constants/typography";

type CareTabsProps = {
  section: CareSection;
  onChange: (section: CareSection) => void;
};

export function CareTabs({ section, onChange }: CareTabsProps) {
  const { colors } = useTheme();

  const surface = {
    backgroundColor: colors.surfaceRaised,
  };

  return (
    <AppView
      row
      style={[
        styles.tabs,
        { backgroundColor: colors.surface },
      ]}
    >
      {sections.map((item) => (
        <Pressable
          key={item}
          accessibilityRole="tab"
          accessibilityState={{
            selected: section === item,
          }}
          onPress={() => onChange(item)}
          style={[
            styles.tab,
            section === item && surface,
          ]}
        >
          <AppText
            style={[
              styles.tabText,
              {
                color:
                  section === item
                    ? colors.accent
                    : colors.text,
              },
            ]}
          >
            {item}
          </AppText>
        </Pressable>
      ))}
    </AppView>
  );
}

const styles = StyleSheet.create({
  tabs: {
    borderRadius: 16,
    padding: 4,
    gap: 2,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 10,
    lineHeight: 16,
    fontFamily: Fonts.bold,
    textAlign: "center",
  },
});