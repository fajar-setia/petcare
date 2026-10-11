import { useState } from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TopBarLogo } from "../../components/navigation";
import {
  Screen,
} from "../../components/theme";
import { HealthMetrics, PetProfileCard, CareTabs, NutritionWarning, MedicalSchedule, MedicalHistory, PetMoments, MedicalActions } from "../../components/care";
import { sections } from "../../constants/careData";



export default function CarePage() {
  const insets = useSafeAreaInsets();
  const [section, setSection] = useState<(typeof sections)[number]>(
    sections[0],
  );
  const medical = section === sections[0];
  return (
    <Screen
      edges={["left", "right"]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 110 },
      ]}
    >
      <Tabs.Screen
        options={{
          headerLeft: () => <TopBarLogo subtitle="Profil Peliharaan" />,
        }}
      />

      <PetProfileCard />

      <HealthMetrics />

      <CareTabs 
        section={section}
        onChange={setSection}
      />

      {medical && <NutritionWarning />}

      {section !== sections[2] && <MedicalSchedule />}

      {medical && <MedicalHistory />}

      {section !== sections[1] && <PetMoments />}

      {medical && <MedicalActions />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8, gap: 24 },
});
