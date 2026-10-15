
import { apiClient } from "../../../lib/apiClient";

import type {
  Clinic,
  ClinicPayload,
} from "../types/clinic.types";

// Payload khusus untuk update
type UpdateClinicPayload = Omit<
  ClinicPayload,
  "services" | "categoryIds"
> & {
  categoryIds?: string[];
  services?: {
    id?: string;
    name: string;
    description: string | null;
    price: number;
  }[];
};

export const clinicApi = {
  // GET semua klinik
  getAll: () =>
    apiClient<Clinic[]>("/api/clinics"),

  // GET klinik berdasarkan UUID
  getById: (id: string) =>
    apiClient<Clinic>(`/api/clinics/${id}`),

  // POST tambah klinik
  create: (data: ClinicPayload) =>
    apiClient<Clinic>("/api/clinics", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // PUT update klinik
  update: (id: string, data: UpdateClinicPayload) =>
    apiClient<Clinic>(`/api/clinics/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // DELETE hapus klinik
  delete: (id: string) =>
    apiClient<void>(`/api/clinics/${id}`, {
      method: "DELETE",
    }),
};
