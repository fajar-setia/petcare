import { owner, pets, appointment } from "../../constants/homeData";
import { StyleSheet, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen } from "../../components/theme";
import { useTheme } from "../../providers/ThemeProvider";
import { TextHeader, HealthStatusCard, PetSection, QuickActions, RoutineCard, AppointmentCard, EducationSection } from "../../components/home";

export default function HomePage() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Screen
      edges={["left", "right"]}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 109 },
      ]}
    >
      <TextHeader name={owner.firstName} petNames={pets.map((pet) => pet.name).join(" & ")} />

      <HealthStatusCard />

      <PetSection />

      <QuickActions />

      <RoutineCard />

      <AppointmentCard appointment={appointment} />

      <EducationSection />

    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 10 },
});
