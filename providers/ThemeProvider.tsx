import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/color";

export type ThemeMode = "system" | "light" | "dark";
type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colors: typeof Colors.light;
};
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  // Pilihan manual berlaku selama aplikasi terbuka; default mengikuti perangkat.
  const [mode, setMode] = useState<ThemeMode>("system");
  const scheme =
    mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        isDark: scheme === "dark",
        colors: Colors[scheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("useTheme harus berada di dalam ThemeProvider");
  return theme;
}
