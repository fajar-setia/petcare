
import type { Clinic as ApiClinic } from "../types/clinic.types";
import type { Clinic as UIClinic } from "../../../constants/clinicData";

export function mapClinicToUI(clinic: ApiClinic): UIClinic {
  return {
    id: clinic.id,
    name: clinic.name,
    address: clinic.address,

    // Data yang belum tersedia dari backend
    distance: "Jarak belum tersedia",
    note: "",
    rating: "Belum ada rating",
    slot: "Jadwal belum tersedia",
    hospital: false,

    // Data dari backend
    services: clinic.services.map((service) => service.name),
    categories: clinic.categories.map((category) => category.name),

    photo: clinic.imageUrl ?? "",

    badge: clinic.is24Hours
      ? "Buka 24 Jam"
      : "Jam operasional tersedia",

    warning: !clinic.is24Hours,
  };
}

export function mapClinicsToUI(
  clinics: ApiClinic[]
): UIClinic[] {
  return clinics.map(mapClinicToUI);
}
