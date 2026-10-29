import { create } from "zustand";
import { devtools } from "zustand/middleware";

/** Отпускные/больничные дни по месяцам: ключ «MM.YYYY» → количество дней */
export type Absences = Record<string, number>;

const STORAGE_KEY = "jira-analyzer-absences";

const loadAbsences = (): Absences => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, unknown>;
    return Object.fromEntries(Object.entries(stored).filter(([, v]) => typeof v === "number" && v > 0)) as Absences;
  } catch {
    return {};
  }
};

export const useAbsencesStore = create<{ absences: Absences }>()(devtools(() => ({ absences: loadAbsences() })));

/** Сохраняет пропущенные дни в localStorage и обновляет стор */
export const saveAbsences = (absences: Absences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(absences));
  } catch (e) {
    console.error("Не удалось сохранить отпускные/больничные дни", e);
  }
  useAbsencesStore.setState({ absences });
};
