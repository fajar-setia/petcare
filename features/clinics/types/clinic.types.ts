
export interface Category {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  clinicId: string;
  name: string;
  description: string | null;
  price: number;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  is24Hours: boolean;

  imageUrl: string | null;
  description: string | null;
  phone: string | null;

  openingTime: string | null;
  closingTime: string | null;

  latitude: number | null;
  longitude: number | null;

  categories: Category[];
  services: Service[];
}

export type ClinicPayload = Omit<
  Clinic,
  "id" | "categories" | "services"
> & {
  categoryIds?: string[];
  services?: Omit<Service, "id" | "clinicId">[];
};
