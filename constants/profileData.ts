import { owner } from "./homeData";
import type { MenuItem } from "../components/profile/MenuRow";

export type Account = {
  name: string;
  email: string;
  phone: string;
};

export const account = {
  ...owner,
  email: "sarah.azzahra@pawcare.id",
  phone: "+62 812–3456–7890",
};

export const settings: MenuItem[] = [
  {
    icon: "contact",
    title: "Informasi Pribadi & Kontak Darurat",
    description: "Kelola data wali & nomor darurat 24 jam",
  },
  {
    icon: "heart",
    title: "Klinik Favorit & Dokter",
    description: "2 klinik & dokter hewan terpercaya",
    badge: "2 tersimpan",
  },
  {
    icon: "wallet",
    title: "Metode Pembayaran & Tagihan",
    description: "GoPay, Mandiri Virtual Account",
  },
  {
    icon: "bell",
    title: "Pengingat & Notifikasi Push",
    description: "Vaksin, Jadwal Makan, Grooming",
  },
  {
    icon: "shield",
    title: "Asuransi & Proteksi PawCare",
    description: "Cover rawat inap & tindakan darurat",
    badge: "Aktif",
    tone: "warm",
  },
];