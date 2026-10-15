export const categories = [
  "Semua",
  "Klinik Umum",
  "Spesialis Bedah",
  "Vaksinasi",
] as const;

export type ClinicCategory = (typeof categories)[number];

export type Doctor = {
  name: string;
  specialty: string;
  clinic: string;
  distance: string;
  rating: string;
  schedule: string;
  photo: string;
};

export type Clinic = {
  id?: string;
  name: string;
  address: string;
  distance: string;
  note: string;
  rating: string;
  badge: string;
  warning: boolean;
  services: string[];
  categories: string[];
  slot: string;
  hospital: boolean;
  photo: string;
};

// Salin seluruh objek doctors dari kode lamamu
export const doctors: Doctor[] = [
  {
    name: "Drh. Anisa Wijaya",
    specialty: "Spesialis Kucing",
    clinic: "Klinik Satwa Bahagia Kemang",
    distance: "1.2 km",
    rating: "4.9 (128)",
    schedule: "Praktik Hari Ini (14:00 - 20:00)",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=320&auto=format&fit=crop&q=80",
  },
  {
    name: "Drh. Raditya Putra",
    specialty: "Spesialis Bedah",
    clinic: "Klinik Satwa Medika",
    distance: "2.8 km",
    rating: "4.8 (96)",
    schedule: "Tersedia Besok (09:00 - 17:00)",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=320&auto=format&fit=crop&q=80",
  },
];

// Salin seluruh objek clinics dari kode lamamu
export const clinics: Clinic[] = [
  {
    name: "Klinik Satwa Bahagia",
    address: "Cabang Kemang, Jakarta Selatan",
    distance: "1.2 km",
    note: "Mitra Resmi PawCare",
    rating: "4.9 (340+)",
    badge: "Buka 24 Jam",
    warning: false,
    services: [
      "UGD 24 Jam",
      "USG & X-Ray",
      "Rawat Inap Isolasi",
      "Apotek Hewan",
    ],
    categories: ["Klinik Umum", "Vaksinasi"],
    slot: "Hari ini, 15:30 WIB",
    hospital: false,
    photo:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0?w=320&auto=format&fit=crop&q=80",
  },
  {
    name: "Klinik Satwa Medika",
    address: "Bangka, Mampang Prapatan",
    distance: "2.8 km",
    note: "Layanan Bedah Rutin",
    rating: "4.8 (210+)",
    badge: "Tutup 21:00",
    warning: true,
    services: ["Laboratorium Darah", "Bedah Steril", "Dentistry Satwa"],
    categories: ["Klinik Umum", "Spesialis Bedah", "Vaksinasi"],
    slot: "Hari ini, 17:00 WIB",
    hospital: false,
    photo:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=320&auto=format&fit=crop&q=80",
  },
  {
    name: "RS Hewan Pusat VetCare",
    address: "Jl. TB Simatupang, Cilandak",
    distance: "4.5 km",
    note: "Buka 24 Jam Nonstop",
    rating: "4.9 (500+)",
    badge: "RS Hewan Rujukan",
    warning: false,
    services: ["ICU & Ventilator", "Operasi Mayor", "Hemodialisis Satwa"],
    categories: ["Spesialis Bedah"],
    slot: "Spesialis Lengkap 24 Jam",
    hospital: true,
    photo:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=320&auto=format&fit=crop&q=80",
  },
];
