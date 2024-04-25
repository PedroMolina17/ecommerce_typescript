import create from "zustand";

type ThemeStore = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: false,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useThemeStore;
