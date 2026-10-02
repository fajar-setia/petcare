import { useRouter } from "expo-router";
import { AppText, Button, Card, Screen, Spacer } from "../components/theme";
import { StyleSheet } from "react-native";

export default function WelcomePage() {
  const router = useRouter();
  return (
    <Screen edges={["top", "left", "right", "bottom"]} contentContainerStyle={styles.container}>
      <Card>
        <AppText variant="title">Selamat datang di PawCare</AppText>
        <Spacer size={8} />
        <AppText color="muted">
          Tempat sederhana untuk merawat hewan kesayanganmu.
        </AppText>
        <Spacer size={24} />
        <Button
          title="Buka Dashboard"
          onPress={() => router.push("/(dashboard)/home")}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
