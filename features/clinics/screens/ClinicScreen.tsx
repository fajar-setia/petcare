import { useMemo, useState } from "react";
import { Tabs } from "expo-router";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TopBarLogo } from "../../../components/navigation";
import { Screen } from "../../../components/theme";
import {
  ClinicCategories,
  ClinicSearch,
  DoctorSection,
  EmergencyCard,
  ClinicSection,
  TeleVetCard,
} from "../../../components/clinic";
import { type ClinicCategory, doctors } from "../../../constants/clinicData";
import { AppText } from "../../../components/theme";

//service
import { useClinics } from "../hooks/useClinics";
import { mapClinicsToUI } from "../utils/clinicMapper";

export default function ClinicPage() {
  const { clinics: apiClinics, loading, error, refetch } = useClinics();

  const clinics = useMemo(() => mapClinicsToUI(apiClinics), [apiClinics]);

  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ClinicCategory>("Semua");
  const [only24Hours, setOnly24Hours] = useState(false);
  const search = query.trim().toLocaleLowerCase("id");
  const visibleClinics = clinics.filter(
    (clinic) =>
      (category === "Semua" || clinic.categories.includes(category)) &&
      (!only24Hours || !clinic.warning) &&
      `${clinic.name} ${clinic.address} ${clinic.services.join(" ")}`
        .toLocaleLowerCase("id")
        .includes(search),
  );

  const visibleDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty} ${doctor.clinic}`
      .toLocaleLowerCase("id")
      .includes(search),
  );

  const resetFilters = () => {
    setQuery("");
    setCategory("Semua");
    setOnly24Hours(false);
  };

  return (
    <Screen
      edges={["left", "right"]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 112 },
      ]}
    >
      <Tabs.Screen
        options={{
          headerLeft: () => <TopBarLogo subtitle="PawCare Klinik & Dokter" />,
        }}
      />

      <ClinicSearch
        query={query}
        onQueryChange={setQuery}
        only24Hours={only24Hours}
        onToggle24Hours={() => setOnly24Hours((prev) => !prev)}
      />

      <EmergencyCard />

      <ClinicCategories category={category} onChange={setCategory} />

      <DoctorSection doctors={visibleDoctors} />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <AppText>Gagal memuat klinik: {error}</AppText>
      ) : (
        <ClinicSection clinics={visibleClinics} onReset={resetFilters} />
      )}

      <TeleVetCard />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 8, gap: 26 },
});
