import { AppText, Card, Screen, Spacer } from "../../components/theme";

export default function CarePage() {
  return (
    <Screen edges={["left", "right"]}>
      <AppText variant="title">Perawatan Hewan</AppText>
      <Spacer size={8} />
      <AppText color="muted">
        Di sini kamu bisa menemukan tips dan panduan perawatan hewan peliharaanmu.
      </AppText>
      <Spacer size={24} />
      <Card>
        <AppText variant="subtitle">Tips Perawatan</AppText>
        <AppText>
          Pastikan hewanmu mendapat makanan yang sesuai, air bersih, dan waktu bermain.
        </AppText>
      </Card>
    </Screen>
  );
}