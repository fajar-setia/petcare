import { AppText, Card, Screen, Spacer } from "../../components/theme";

export default function ClinicPage() {
  return (
    <Screen edges={["left", "right"]}>
      <AppText variant="title">Klinik Hewan</AppText>
      <Spacer size={8} />
      <AppText color="muted">
        Temukan layanan klinik dan konsultasi untuk kesehatan hewan peliharaanmu.
      </AppText>
      <Spacer size={24} />
      <Card>
        <AppText variant="subtitle">Layanan Klinik</AppText>
        <AppText>
          Konsultasi dokter hewan, pemeriksaan rutin, dan vaksinasi. Fitur pencarian klinik akan segera tersedia.
        </AppText>
      </Card>
    </Screen>
  );
}
