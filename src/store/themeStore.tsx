import { create } from "zustand";

type Theme = "light" | "dark" | string;

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  loadTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      return { theme: newTheme };
    }),

  loadTheme: () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "dark";
      set({ theme: savedTheme });
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  },
}));

export default useThemeStore;
