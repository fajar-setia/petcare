import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { AppText, AppView } from "../theme";

import { Fonts } from "../../constants/typography";

type TopBarLogoProps = {
  title?: string;
  subtitle?: string;
};

export function TopBarLogo({
  title = "PawCare",
  subtitle = "Beranda",
}: TopBarLogoProps) {
  const { colors } = useTheme();

  return (
    <AppView style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <AppView>
        <AppText
          style={[
            styles.title,
            {
              color: colors.primary,
            },
          ]}
        >
          {title}
        </AppText>

        <AppText
          style={[
            styles.subtitle,
            {
              color: colors.text,
            },
          ]}
        >
          {subtitle}
        </AppText>
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 38,
    height: 38,
    borderRadius: 50,
  },

  title: {
    fontSize: 18,
    fontFamily: Fonts.brandBold,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.brandMedium,
  },
});