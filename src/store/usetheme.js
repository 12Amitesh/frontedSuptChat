import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: "light", 

  toggleTheme: () => {
    const currentTheme = get().theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    set({ theme: nextTheme });
    document.documentElement.setAttribute("data-theme", nextTheme);

   
  },
}));
