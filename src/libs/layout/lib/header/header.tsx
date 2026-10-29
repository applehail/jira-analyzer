import { useLayoutEffect, useRef } from "react";

import { Container } from "@/libs/ui";
import { ClearUploadButton } from "../clear-upload-button/clear-upload-button";
import { ImportDialog } from "../import-dialog/import-dialog";
import { Logo } from "../logo/logo";
import { SettingsDialog } from "../settings-dialog/settings-dialog";
import { ThemeToggle } from "../theme-toggle/theme-toggle";

export const Header = () => {
  const ref = useRef<HTMLElement>(null);

  // Высота шапки в --header-h: от неё отталкиваются другие закреплённые элементы
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref} className="sticky top-0 z-50 w-full border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xs">
      <Container>
        <div className="flex min-w-0 items-center">
          <Logo />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ClearUploadButton />
          <ImportDialog />
          <SettingsDialog />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};
