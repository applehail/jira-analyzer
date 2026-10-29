import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { JiraIssue } from "@/model/jira-csv";
import { saveAbsences, useAbsencesStore } from "./absences-store";
import { SETTINGS_STORAGE_KEY } from "./settings-store";

type IssuesState = {
  /** импортированные задачи; null — выгрузка ещё не загружалась */
  issues: JiraIssue[] | null;
  /** имя загруженного файла выгрузки */
  fileName: string | null;
};

const STORAGE_KEY = "jira-analyzer-issues";

const loadIssuesState = (): IssuesState => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<IssuesState> | null;
    if (stored && Array.isArray(stored.issues)) {
      return { issues: stored.issues, fileName: typeof stored.fileName === "string" ? stored.fileName : null };
    }
  } catch {
    // повреждённые данные — начинаем с пустого состояния
  }
  return { issues: null, fileName: null };
};

export const useIssuesStore = create<IssuesState>()(devtools(() => loadIssuesState()));

/** Сохраняет данные (имя файла и данные таблицы) в localStorage, сбрасывает отпускные/больничные дни и обновляет стор */
export const setIssues = (issues: JiraIssue[] | null, fileName: string | null = null) => {
  try {
    if (issues) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ issues, fileName }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error("Не удалось сохранить данные", e);
  }
  saveAbsences({});
  useIssuesStore.setState({ issues, fileName });
};

/** Очищает всё в localStorage, кроме настройки «Адрес Jira», и сбрасывает сторы выгрузки и отпускных дней */
export const clearUpload = () => {
  try {
    Object.keys(localStorage)
      .filter((key) => key !== SETTINGS_STORAGE_KEY)
      .forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    console.error("Не удалось очистить localStorage", e);
  }
  useAbsencesStore.setState({ absences: {} });
  useIssuesStore.setState({ issues: null, fileName: null });
};
