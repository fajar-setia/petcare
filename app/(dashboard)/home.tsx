import { useRouter } from "expo-router";
import { AppText, Button, Card, Screen, Spacer } from "../../components/theme";

export default function HomePage() {
  const router = useRouter();
  return (
    <Screen edges={["left", "right"]}>
      <AppText variant="title">Halo, pencinta hewan!</AppText>
      <Spacer size={8} />
      <AppText color="muted">Selamat datang di dashboard PawCare.</AppText>
      <Spacer size={24} />
      <Card>
        <AppText variant="subtitle">Perawatan hari ini</AppText>
        <AppText>
          Pastikan hewanmu mendapat makanan, air bersih, dan waktu bermain.
        </AppText>
      </Card>
      <Spacer size={24} />
      <Button
        title="Buka Profil"
        onPress={() => router.navigate("/(dashboard)/profile")}
      />
    </Screen>
  );
}
