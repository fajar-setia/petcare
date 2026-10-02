// Palet utama dari referensi. Warna permukaan disesuaikan untuk tiap tema.
const palette = {
  primary: '#2E7D32',
  secondary: '#FFA000',
  tertiary: '#81C784',
  neutral: '#202621',
};

export const Colors = {
  ...palette,
  light: {
    ...palette,
    background: '#F3F6F0',
    surface: '#E8EFE4',
    text: '#202621',
    muted: '#52604F',
    border: '#B9C7B5',
    accent: '#2E7D32',
    onPrimary: '#FFFFFF',
    onSecondary: '#202621',
  },
  dark: {
    ...palette,
    background: '#151B16',
    surface: '#202621',
    text: '#EDF4E9',
    muted: '#B8C6B3',
    border: '#4C5C4B',
    accent: '#81C784',
    onPrimary: '#FFFFFF',
    onSecondary: '#202621',
  },
};
