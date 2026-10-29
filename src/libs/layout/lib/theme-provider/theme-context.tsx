import { createContext } from "react";

// types
type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

// context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
