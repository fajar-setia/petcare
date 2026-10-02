import { useRouter } from "expo-router";
import {
  AppText,
  AppView,
  Button,
  Card,
  Screen,
  Spacer,
} from "../../components/theme";
import { useTheme, type ThemeMode } from "../../providers/ThemeProvider";

const themeOptions: { title: string; value: ThemeMode }[] = [
  { title: "Ikuti sistem", value: "system" },
  { title: "Terang", value: "light" },
  { title: "Gelap", value: "dark" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { mode, setMode } = useTheme();
  return (
    <Screen edges={["left", "right"]}>
      <AppText variant="title">Profil</AppText>
      <Spacer size={24} />
      <Card>
        <AppText variant="subtitle">Tampilan aplikasi</AppText>
        <AppText color="muted">Pilih tema yang nyaman untukmu.</AppText>
        <Spacer size={8} />
        <AppView gap={12}>
          {themeOptions.map((option) => (
            <Button
              key={option.value}
              title={option.title}
              variant={mode === option.value ? "primary" : "outline"}
              accessibilityState={{ selected: mode === option.value }}
              onPress={() => setMode(option.value)}
            />
          ))}
        </AppView>
        <AppText variant="caption" color="muted">
          Pilihan berlaku selama aplikasi terbuka.
        </AppText>
      </Card>
      <Spacer size={24} />
      <Button
        title="Kembali ke Beranda"
        variant="secondary"
        onPress={() => router.navigate("/(dashboard)/home")}
      />
    </Screen>
  );
}
