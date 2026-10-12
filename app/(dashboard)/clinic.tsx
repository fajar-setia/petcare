import { useState } from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TopBarLogo } from "../../components/navigation";
import {
  Screen,
} from "../../components/theme";
import { Fonts } from "../../constants/typography";
import { useTheme } from "../../providers/ThemeProvider";
import {
  ClinicCategories,
  ClinicSearch,
  DoctorSection,
  EmergencyCard,
  ClinicSection,
  TeleVetCard,
} from "../../components/clinic";
import { type ClinicCategory, clinics, doctors } from "../../constants/clinicData";


export default function ClinicPage() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ClinicCategory>("Semua");
  const [only24Hours, setOnly24Hours] = useState(false);
  const search = query.trim().toLocaleLowerCase("id");
  const visibleClinics = clinics.filter(
    (clinic) =>
      (category === "Semua" || clinic.categories.includes(category)) &&
      (!only24Hours || !clinic.warning) &&
      `${clinic.name} ${clinic.address} ${clinic.services.join(" ")} ${clinic.categories.join(" ")}`
        .toLocaleLowerCase("id")
        .includes(search),
  );
  const visibleDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty} ${doctor.clinic}`
      .toLocaleLowerCase("id")
      .includes(search),
  );

  const soft = { backgroundColor: colors.surface };

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

      <ClinicSection clinics={visibleClinics} onReset={resetFilters} />

      <TeleVetCard />

    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 8, gap: 26 },
});
