import { useState, useEffect } from "react";

import { ThemeContext } from "./theme-context";

// types
type ThemeMode = "light" | "dark";

export type AppThemeProviderProps = {
  children: React.ReactNode;
};

// vars
const themeVar = "app-theme";

/**
 * provider
 * @param param0
 * @returns
 */
export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(themeVar) as ThemeMode;
    if (saved) {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  /**
   * change theme
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Эффект меняет атрибут DOM-дерева. Браузер мгновенно перерисовывает CSS-переменные.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    localStorage.setItem("app-theme", theme);
    root.setAttribute(themeVar, theme);
    root.classList.add(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
