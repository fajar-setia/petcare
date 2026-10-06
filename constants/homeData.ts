export const photos = {
  cat: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=640&auto=format&fit=crop&q=80",
  dog: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=640&auto=format&fit=crop&q=80",
};
export const pets = [
  {
    id: "mochi",
    name: "Mochi",
    sex: "♀",
    breed: "British Shorthair",
    age: "1.5 thn",
    status: "Sehat & Ceria",
    reminder: "Vaksin: 12 Nov",
    weight: "4.2 kg",
    photo: photos.cat,
    warning: false,
  },
  {
    id: "milo",
    name: "Milo",
    sex: "♂",
    breed: "Golden Retriever",
    age: "2 thn",
    status: "Perlu Grooming",
    reminder: "Cacing Hari Ini",
    weight: "18.5 kg",
    photo: photos.dog,
    warning: true,
  },
];
export type Article = {
  category: string;
  title: string;
  photo: string;
  duration: number;
};

export const articles: Article[] = [
  {
    category: "Kucing",
    title: "5 Tanda Kucing Anda Sedang Mengalami Stres Ringan",
    photo: photos.cat,
    duration: 3,
  },
  {
    category: "Anjing",
    title: "Panduan Lengkap Nutrisi Seimbang untuk Anjing",
    photo: photos.dog,
    duration: 5,
  },
];

export type Pet = (typeof pets)[number];

export const owner = { name: "Sarah Azzahra", firstName: "Sarah" };

export const appointment = {
  time: "Besok, 10:00 WIB",
  doctor: "Drh. Anisa Wijaya",
  clinic: "Klinik Satwa Bahagia • Cab. Kemang",
  reason: "Konsultasi Rutin Milo",
};

export type Appointment = typeof appointment;
