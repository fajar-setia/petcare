import { AppView, AppText, Card, Photo, AppIcon } from "../theme";
import { Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { ClinicAction } from "./ClinicAction";
import type { Doctor } from "../../constants/clinicData";
import {showFeature} from "../../utils/feature";
import {useTheme} from "../../providers/ThemeProvider";
import {Fonts} from "../../constants/typography";

type DoctorSectionProps = {
  doctors: Doctor[];
};

export function DoctorSection({
  doctors
}: DoctorSectionProps) {
  const { width } = useWindowDimensions();
  const {colors} = useTheme();

  const surface = { backgroundColor: colors.surfaceRaised };
  const soft = { backgroundColor: colors.surface };
  return (
    <AppView gap={12}>
      <AppView row gap={8} style={styles.center}>
        <AppView style={styles.flex}>
          <AppText style={styles.heading}>Dokter Hewan Favorit</AppText>
          <AppText style={styles.small}>
            Pilihan dokter berpengalaman di sekitar Anda
          </AppText>
        </AppView>
        <Pressable
          accessibilityRole="button"
          onPress={() => showFeature("Semua Dokter Hewan")}
          style={styles.link}
        >
          <AppText style={[styles.small, { color: colors.accent }]}>
            Lihat Semua
          </AppText>
          <AppIcon name="chevron" size={12} color={colors.accent} />
        </Pressable>
      </AppView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.doctorList}
        style={styles.bleed}
      >
        {doctors.map((doctor, index) => (
          <Card
            key={doctor.name}
            style={[styles.card, surface, { width: Math.min(width - 64, 340) }]}
          >
            <AppView row gap={9}>
              <Photo
                uri={doctor.photo}
                label={doctor.name}
                size={52}
                rounded={false}
              />
              <AppView style={styles.flex}>
                <AppView row style={styles.between} gap={4}>
                  <AppText style={[styles.tiny, { color: colors.accent }]}>
                    {doctor.specialty}
                  </AppText>
                  <AppText style={styles.tiny}>
                    <AppText style={[styles.tiny, { color: colors.secondary }]}>
                      ☆{" "}
                    </AppText>
                    {doctor.rating}
                  </AppText>
                </AppView>
                <AppText style={styles.name}>{doctor.name}</AppText>
                <AppText color="muted" style={styles.small}>
                  {doctor.clinic}
                </AppText>
                <AppText style={[styles.small, { color: colors.accent }]}>
                  ➤ {doctor.distance} dari Anda
                </AppText>
              </AppView>
            </AppView>
            <AppText
              style={[
                styles.availability,
                soft,
                { color: index === 0 ? colors.accent : colors.warningText },
              ]}
            >
              ● {doctor.schedule}
            </AppText>
            <AppView row gap={8}>
              <ClinicAction
                title="Chat"
                icon="chat"
                secondary
                compact
                onPress={() => showFeature(`Chat ${doctor.name}`)}
              />
              <ClinicAction
                title="Buat Janji"
                onPress={() => showFeature(`Buat Janji — ${doctor.name}`)}
              />
            </AppView>
          </Card>
        ))}
        {doctors.length === 0 && (
          <AppText color="muted" style={styles.description}>
            Dokter tidak ditemukan. Coba kata kunci lain.
          </AppText>
        )}
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  center: { alignItems: "center" },
  small: { fontSize: 11, lineHeight: 15, fontFamily: Fonts.medium },
  heading: { fontSize: 17, lineHeight: 23, fontFamily: Fonts.bold },
  link: { flexDirection: "row", gap: 3, alignItems: "center", minHeight: 40 },
  doctorList: { paddingHorizontal: 18, paddingBottom: 5, gap: 14 },
  bleed: { marginHorizontal: -18 },
  card: { borderWidth: 0, borderRadius: 18, padding: 14, gap: 12 },
  between: { justifyContent: "space-between", alignItems: "center" },
  tiny: { fontSize: 10, lineHeight: 15, fontFamily: Fonts.medium },
  name: { fontSize: 16, lineHeight: 21, fontFamily: Fonts.bold },
  availability: {
    borderRadius: 12,
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingVertical: 6,
    fontSize: 10,
    lineHeight: 16,
  },
  description: { fontSize: 12, lineHeight: 18 },
})
