import { AppIcon, AppText, AppView } from "../theme";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { ClinicAction } from "./ClinicAction";
import { showFeature } from "../../utils/feature";
import {useTheme} from "../../providers/ThemeProvider"
import {Fonts} from "../../constants/typography"

type ClinicSearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
  only24Hours: boolean;
  onToggle24Hours: () => void;
};

export function ClinicSearch({
  query,
  onQueryChange,
  only24Hours,
  onToggle24Hours,
}: ClinicSearchProps) {

  const {colors} = useTheme();

  const surface = {
    backgroundColor: colors.surfaceRaised,
  };

  return (
    <AppView gap={10}>
      <AppView row gap={10} style={styles.center}>
        <AppIcon name="contact" size={19} color={colors.accent} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Pilih lokasi pemeriksaan"
          onPress={() => showFeature("Lokasi Pemeriksaan")}
          style={styles.flex}
        >
          <AppText style={styles.small}>Lokasi Pemeriksaan</AppText>
          <AppText style={styles.medium}>Jakarta Selatan, Kemang⌄</AppText>
        </Pressable>
        <ClinicAction
          title="Peta"
          icon="book"
          secondary
          compact
          onPress={() => showFeature("Peta Klinik")}
        />
      </AppView>

      <AppView row gap={8} style={styles.center}>
        <AppView row gap={9} style={[styles.search, surface]}>
          <AppView style={[styles.searchIcon, { borderColor: colors.muted }]}>
            <AppView
              style={[styles.searchHandle, { backgroundColor: colors.muted }]}
            />
          </AppView>
          <TextInput
            value={query}
            onChangeText={onQueryChange}
            placeholder="Cari klinik, nama dokter, atau layanan"
            placeholderTextColor={colors.muted}
            accessibilityLabel="Cari klinik, nama dokter, atau layanan"
            returnKeyType="search"
            style={[styles.input, { color: colors.text }]}
          />
        </AppView>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Filter klinik buka 24 jam"
          accessibilityState={{ selected: only24Hours }}
          onPress={onToggle24Hours}
          style={[
            styles.filter,
            {
              backgroundColor: only24Hours ? colors.primary : colors.surface,
            },
          ]}
        >
          <AppText
            style={{
              color: only24Hours ? colors.onPrimary : colors.accent,
              fontSize: 23,
            }}
          >
            ☷
          </AppText>
        </Pressable>
      </AppView>

      {only24Hours && (
        <AppText style={[styles.small, { color: colors.accent }]}>
          Filter aktif: Buka 24 jam
        </AppText>
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center" },
  flex: { flex: 1, minWidth: 0 },
  medium: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.semiBold },
  small: { fontSize: 11, lineHeight: 15, fontFamily: Fonts.medium },
  search: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: "center",
    minHeight: 44,
  },
  searchIcon: {
    width: 13,
    height: 13,
    borderWidth: 1.5,
    borderRadius: 7,
    marginRight: 3,
  },
  searchHandle: {
    position: "absolute",
    width: 7,
    height: 1.5,
    right: -5,
    bottom: -3,
    transform: [{ rotate: "45deg" }],
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: Fonts.regular,
    fontSize: 12,
    paddingVertical: 11,
  },
  filter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
})
