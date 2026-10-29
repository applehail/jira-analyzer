// import { config } from "@/app/config";
import { useDarkModeFixed } from "./hook-use-dark-mode";
import type { ThemeType } from "@/libs/types";

export type UseTheme = {
  toggle: () => void;
  theme: ThemeType;
};

export const useTheme = (/*dark = true*/): UseTheme => {
  const forceWhite = false;
  const { isDarkMode, toggle } = useDarkModeFixed({
    // initializeWithValue: false, // cause double render
    // defaultValue: dark,
  });

  return {
    toggle,
    theme: forceWhite ? "light" : isDarkMode ? "dark" : "light",
  };
};
