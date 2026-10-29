import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppTheme } from "../theme-provider/theme-hook";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppTheme();
  const label = theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему";

  return (
    <Button
      onClick={toggleTheme}
      title={label}
      aria-label={label}
      variant="outline"
      size="icon"
      className="rounded-full hover:bg-auto active:scale-[0.98] focus-visible:ring-2)"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      <span className="sr-only">Переключить тему</span>
    </Button>
  );
};
