import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppView, AppIcon, Photo } from "../theme";
import { owner } from "../../constants/homeData";
import { useTheme } from "../../providers/ThemeProvider";
import { showFeature } from "../../utils/feature";

export function HeaderActions() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <AppView
      style={[styles.actions, { paddingRight: Math.max(insets.right, 20) }]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notifikasi, ada pemberitahuan baru"
        onPress={() => showFeature("Notifikasi")}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.65 : 1 },
        ]}
      >
        <AppIcon name="bell" size={23} color={colors.text} />
        <AppView style={styles.dot} />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Lihat akun ${owner.firstName}`}
        onPress={() => router.navigate("/(dashboard)/profile")}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.65 : 1 },
        ]}
      >
        <Photo uri={owner.photo} label={owner.name} size={32} />
      </Pressable>
    </AppView>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: "row", alignItems: "center", gap: 12 },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFA000",
  },
});
