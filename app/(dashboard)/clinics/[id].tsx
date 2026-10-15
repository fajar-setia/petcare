
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { clinicApi } from "../../../features/clinics/api/clinicApi";
import type { Clinic } from "../../../features/clinics/types/clinic.types";

export default function ClinicDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchClinic() {
      setLoading(true);
      setError(null);
      setClinic(null);

      try {
        if (!id) {
          throw new Error("ID klinik tidak ditemukan");
        }

        const data = await clinicApi.getById(id);

        if (active) {
          setClinic(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Gagal mengambil detail klinik"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchClinic();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Memuat detail klinik...</Text>
      </View>
    );
  }

  if (error || !clinic) {
    return (
      <View style={styles.center}>
        <Text>{error ?? "Klinik tidak ditemukan"}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{clinic.name}</Text>

      <Text>{clinic.address}</Text>

      <Text style={styles.heading}>Kategori</Text>
      {clinic.categories.map((category) => (
        <Text key={category.id}>• {category.name}</Text>
      ))}

      <Text style={styles.heading}>Layanan & Harga</Text>
      {clinic.services.map((service) => (
        <View key={service.id} style={styles.service}>
          <Text style={styles.serviceName}>{service.name}</Text>

          <Text>
            Rp{service.price.toLocaleString("id-ID")}
          </Text>

          {service.description && (
            <Text>{service.description}</Text>
          )}
        </View>
      ))}

      <Text style={styles.heading}>Jam Operasional</Text>
      <Text>
        {clinic.is24Hours
          ? "Buka 24 Jam"
          : clinic.openingTime && clinic.closingTime
            ? `${clinic.openingTime} - ${clinic.closingTime}`
            : "Jam operasional belum tersedia"}
      </Text>

      {clinic.phone && (
        <>
          <Text style={styles.heading}>Telepon</Text>
          <Text>{clinic.phone}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  service: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#E8E8E8",
    gap: 5,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
  },
});
