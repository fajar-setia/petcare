import type { AppIconName } from "../components/theme/AppIcon";

type TabItem = {
  name: "home" | "care" | "clinic" | "profile";
  title: string;
  icon: AppIconName;
};

export const tabs = [
  {
    name: "home",
    title: "Home",
    icon: "home",
  },
  {
    name: "care",
    title: "Care",
    icon: "care",
  },
  {
    name: "clinic",
    title: "Klinik",
    icon: "clinic",
  },
  {
    name: "profile",
    title: "Profil",
    icon: "profile",
  },
] satisfies TabItem[];