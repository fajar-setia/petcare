
import { useCallback, useEffect, useRef, useState } from "react";

import { clinicApi } from "../api/clinicApi";
import type { Clinic } from "../types/clinic.types";

export function useClinics() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef(true);

  const fetchClinics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await clinicApi.getAll();

      if (mountedRef.current) {
        setClinics(data);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil data klinik"
        );
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchClinics();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchClinics]);

  return {
    clinics,
    loading,
    error,
    refetch: fetchClinics,
  };
}
