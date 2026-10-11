import { useTheme, type ThemeMode } from "../../providers/ThemeProvider";
import { AppText,AppView, Button,  } from "../theme";
import { MenuRow } from "./MenuRow";
import { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import type { MenuItem } from "./MenuRow";
import { showFeature } from "../../utils/feature";
import { Fonts } from "../../constants/typography";


export function AppearanceSettings() {
  const {colors, mode, setMode} = useTheme();
  const [showAppearance, setShowAppearance] = useState(false);
  const surface = { backgroundColor: colors.surfaceRaised };

  const support: MenuItem[] = [
      { icon: "support", title: "Pusat Bantuan & Tanya CS" },
      { icon: "community", title: "Komunitas Pet Lovers Terdekat" },
      {
        icon: "privacy",
        title: "Pengaturan Privasi & Keamanan",
        onPress: () =>
          Alert.alert("Pengaturan akun", "Pilih pengaturan yang ingin dibuka.", [
            { text: "Tampilan aplikasi", onPress: () => setShowAppearance(true) },
            {
              text: "Privasi & keamanan",
              onPress: () => showFeature("Privasi & keamanan"),
            },
            { text: "Batal", style: "cancel" },
          ]),
      },
      {
        icon: "logout",
        title: "Keluar Akun",
        tone: "danger",
        onPress: () => showFeature("Keluar akun"),
      },
    ];

    const appearanceOptions = [
  {
    title: "Ikuti sistem",
    value: "system",
  },
  {
    title: "Terang",
    value: "light",
  },
  {
    title: "Gelap",
    value: "dark",
  },
] satisfies { title: string; value: ThemeMode }[];
  return (
    <>
      <AppText style={styles.groupLabel}>BANTUAN & KEAMANAN</AppText>
      <AppView style={[styles.menuGroup, surface]}>
        {support.map((item) => (
          <MenuRow key={item.title} item={item} />
        ))}
      </AppView>
      {showAppearance && (
        <AppView style={[styles.appearance, surface]}>
          <AppText style={styles.sectionTitle}>Tampilan aplikasi</AppText>
          {appearanceOptions.map((option) => (
            <Button
              key={option.value}
              title={option.title}
              variant={mode === option.value ? "primary" : "outline"}
              accessibilityState={{ selected: mode === option.value }}
              onPress={() => setMode(option.value)}
            />
          ))}
          <Button
            title="Tutup"
            variant="outline"
            onPress={() => setShowAppearance(false)}
          />
        </AppView>
      )}
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
    menuGroup: { borderRadius: 19, paddingVertical: 1, overflow: "hidden"} ,
    appearance: { padding: 16, borderRadius: 18, gap: 10, marginTop: 16 },
    sectionTitle: { fontFamily: Fonts.semiBold, fontSize: 18, lineHeight: 26 },
})
