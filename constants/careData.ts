import type { AppIconName } from "../components/theme/AppIcon";
import { photos } from "./homeData";

export const sections = [
  "Kesehatan & Medis",
  "Jadwal Rutin",
  "Galeri & Momen",
] as const;

export type CareSection = (typeof sections)[number];

export type HealthMetric = {
  label: string;
  value: string;
  unit: string;
  status: string;
  icon: AppIconName;
};

export const metrics: HealthMetric[] = [
  {
    label: "Berat Badan",
    value: "4.2",
    unit: " kg",
    status: "Ideal",
    icon: "leaf",
  },
  {
    label: "Suhu Tubuh",
    value: "38.4",
    unit: "°C",
    status: "Normal",
    icon: "heart",
  },
  {
    label: "Vaksinasi",
    value: "100%",
    unit: "",
    status: "Lengkap",
    icon: "badge",
  },
];

export type MedicalRecord = {
  date: string;
  category: string;
  title: string;
  description: string;
  doctor: string;
  icon: AppIconName;
};

export const records: MedicalRecord[] = [
  {
    date: "15 Agu 2024",
    category: "Rutin",
    title: "Pemeriksaan Rutin Tahunan",
    description:
      "Kondisi fisik prima, berat ideal, gigi bersih bebas karang gigi yang mengkhawatirkan.",
    doctor: "Drh. Raditya (Klinik Sahabat Satwa)",
    icon: "health",
  },
  {
    date: "20 Mei 2024",
    category: "Vaksinasi",
    title: "Vaksin Tricat Tahap 2",
    description:
      "Antibodi felin panleukopenia, calicivirus, herpesvirus lengkap tanpa reaksi anafilaksis.",
    doctor: "Klinik Satwa Medika Sejahtera",
    icon: "medicine",
  },
  {
    date: "10 Jan 2024",
    category: "Tindakan",
    title: "Operasi Steril (Kastrasi) & Recovery",
    description:
      "Prosedur bedah lancar dengan anestesi inhalasi. Masa pemulihan pasca operasi 7 hari tuntas.",
    doctor: "Drh. Anisa Sp.K",
    icon: "clinic",
  },
];

export const moments = [
  {
    title: "Tidur Siang",
    photo:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=640&auto=format&fit=crop&q=80",
  },
  {
    title: "Setelah Mandi",
    photo: photos.cat,
  },
];