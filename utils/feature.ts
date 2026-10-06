import { Alert } from "react-native";

export const showFeature = (title: string) =>
    Alert.alert(
      title,
      "Fitur ini belum terhubung. Tampilan saat ini menggunakan data contoh.",
    );