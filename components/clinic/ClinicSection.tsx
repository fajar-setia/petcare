import { AppIcon, AppText, AppView, Photo, Card } from "../theme";
import { StyleSheet } from "react-native";
import type { Clinic } from "../../constants/clinicData";
import { ClinicAction } from "./ClinicAction";
import { useTheme } from "../../providers/ThemeProvider";
import { showFeature } from "../../utils/feature";
import { Fonts } from "../../constants/typography";
import { router } from "expo-router";

type ClinicSectionProps = {
  clinics: Clinic[];
  onReset: () => void;
};

export function ClinicSection({ clinics, onReset }: ClinicSectionProps) {
  const { colors, isDark } = useTheme();

  const surface = { backgroundColor: colors.surfaceRaised };
  const soft = { backgroundColor: colors.surface };
  const green = {
    backgroundColor: isDark ? colors.accentSoft : "#AAF0AA",
    color: isDark ? colors.accent : "#14521A",
  };

  return (
    <AppView gap={14}>
      <AppView row gap={8} style={styles.center}>
        <AppView style={styles.flex}>
          <AppText style={styles.heading}>Klinik Hewan Terdekat</AppText>
          <AppText style={styles.small}>
            Buka sekarang dengan fasilitas medis lengkap
          </AppText>
        </AppView>
        <AppText style={[styles.badge, soft, { color: colors.accent }]}>
          {clinics.length} Terdekat
        </AppText>
      </AppView>
      {clinics.map((clinic) => (
        <Card key={clinic.name} style={[styles.card, surface]}>
          <AppView row gap={9}>
            <Photo
              uri={clinic.photo}
              label={clinic.name}
              size={72}
              rounded={false}
            />
            <AppView style={styles.flex} gap={1}>
              <AppView row gap={4} style={[styles.between, styles.wrap]}>
                <AppText
                  style={[
                    styles.badge,
                    clinic.warning
                      ? {
                          backgroundColor: colors.warningSoft,
                          color: colors.warningText,
                        }
                      : green,
                  ]}
                >
                  {clinic.badge}
                </AppText>
                <AppText style={styles.small}>
                  <AppText style={[styles.small, { color: colors.secondary }]}>
                    ☆{" "}
                  </AppText>
                  {clinic.rating}
                </AppText>
              </AppView>
              <AppText style={styles.name}>{clinic.name}</AppText>
              <AppText color="muted" style={styles.small}>
                {clinic.address}
              </AppText>
              <AppText style={[styles.tiny, { color: colors.accent }]}>
                ➤ {clinic.distance} · {clinic.note}
              </AppText>
            </AppView>
          </AppView>
          <AppView row gap={6} style={styles.wrap}>
            {clinic.services.map((service) => (
              <AppText key={service} style={[styles.service, soft]}>
                {service}
              </AppText>
            ))}
          </AppView>
          <AppView row gap={8} style={[styles.slot, soft]}>
            <AppIcon
              name={clinic.hospital ? "shield" : "calendar"}
              size={18}
              color={colors.accent}
            />
            <AppView style={styles.flex}>
              <AppText style={styles.small}>
                {clinic.hospital
                  ? "Fasilitas Bersertifikasi"
                  : "Slot Konsultasi Terdekat"}
              </AppText>
              <AppText style={[styles.small, { fontFamily: Fonts.bold }]}>
                {clinic.slot}
              </AppText>
            </AppView>
            <AppText
              style={[
                styles.badge,
                { backgroundColor: colors.accentSoft, color: colors.accent },
              ]}
            >
              {clinic.hospital ? "Siaga" : "Tersedia"}
            </AppText>
          </AppView>
          <AppView row gap={8}>
            <ClinicAction
              icon="arrow"
              secondary
              compact
              onPress={() => showFeature(`Arah ke ${clinic.name}`)}
            />
            <ClinicAction
              title={
                clinic.hospital
                  ? "Lihat Detail & Fasilitas"
                  : "Lihat Detail & Jadwal"
              }
              onPress={() => {
                if (!clinic.id) {
                  showFeature("Detail klinik belum tersedia");
                  return;
                }
                router.push({
                  pathname: "/clinics/[id]",
                  params: {id: clinic.id},
                })
              }}
            />
          </AppView>
        </Card>
      ))}
      {clinics.length === 0 && (
        <Card style={[styles.card, surface]}>
          <AppText style={styles.medium}>Klinik tidak ditemukan</AppText>
          <AppText color="muted" style={styles.description}>
            Coba kata kunci lain atau ubah kategori dan filter.
          </AppText>
          <ClinicAction title="Reset Pencarian" onPress={onReset} />
        </Card>
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  center: { alignItems: "center" },
  heading: { fontSize: 17, lineHeight: 23, fontFamily: Fonts.bold },
  small: { fontSize: 11, lineHeight: 15, fontFamily: Fonts.medium },
  badge: {
    fontSize: 10,
    lineHeight: 15,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  card: { borderWidth: 0, borderRadius: 18, padding: 14, gap: 12 },
  between: { justifyContent: "space-between", alignItems: "center" },
  wrap: { flexWrap: "wrap" },
  name: { fontSize: 16, lineHeight: 21, fontFamily: Fonts.bold },
  tiny: { fontSize: 10, lineHeight: 15, fontFamily: Fonts.medium },
  service: {
    fontSize: 10,
    lineHeight: 15,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
  },
  slot: { padding: 11, borderRadius: 13, alignItems: "center" },
  medium: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.semiBold },
  description: { fontSize: 12, lineHeight: 18 },
});
