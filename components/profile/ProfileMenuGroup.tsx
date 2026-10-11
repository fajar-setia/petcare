import { StyleSheet } from "react-native";
import { AppText, AppView } from "../theme";
import { Fonts } from "../../constants/typography";
import { useTheme } from "../../providers/ThemeProvider";
import { MenuRow, type MenuItem } from "./MenuRow";

type ProfileMenuGroupProps = {
  title: string;
  items: MenuItem[];
};

export function ProfileMenuGroup({
  title,
  items,
}: ProfileMenuGroupProps) {
  const { colors } = useTheme();

  return (
    <>
      <AppText style={styles.groupLabel}>
        {title}
      </AppText>

      <AppView
        style={[
          styles.menuGroup,
          { backgroundColor: colors.surfaceRaised },
        ]}
      >
        {items.map((item) => (
          <MenuRow
            key={item.title}
            item={item}
          />
        ))}
      </AppView>
    </>
  );
}

const styles = StyleSheet.create({
  groupLabel: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.8,
    marginTop: 23,
    marginBottom: 5,
    marginLeft: 4,
    fontFamily: Fonts.semiBold,
  },

  menuGroup: {
    borderRadius: 19,
    paddingVertical: 1,
    overflow: "hidden",
  },
});