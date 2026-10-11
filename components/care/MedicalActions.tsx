import { AppView, Button } from "../theme";
import { showFeature } from "../../utils/feature";
import { useTheme } from "../../providers/ThemeProvider";
import { StyleSheet } from "react-native";

export function MedicalActions() {
  const {colors} = useTheme();
  return (
    <AppView gap={8} style={styles.actions}>
      <Button
        title="⊕  Tambah Catatan Medis Baru"
        onPress={() => showFeature("Tambah Catatan Medis Baru")}
        style={styles.mainButton}
      />
      <Button
        title="↓  Unduh Rekam Medis (PDF Resmi)"
        variant="outline"
        onPress={() => showFeature("Unduh Rekam Medis")}
        style={[styles.downloadButton, { backgroundColor: colors.surface }]}
      />
    </AppView>
  );
}

const styles = StyleSheet.create({
  actions: { marginTop: 6 },
  mainButton: { borderRadius: 28 },
  downloadButton: { borderRadius: 28, borderWidth: 0 },
})
