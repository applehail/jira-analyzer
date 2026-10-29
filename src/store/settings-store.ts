import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Settings = {
  /** адрес Jira для ссылок на задачи (с завершающим /browse/) */
  jiraUrl: string;
};

const STORAGE_KEY = "jira-analyzer-settings";

export const DEFAULT_SETTINGS: Settings = {
  jiraUrl: "https://jira.cursusts.ru/browse/",
};

const loadSettings = (): Settings => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Partial<Settings>;
    return { jiraUrl: stored.jiraUrl || DEFAULT_SETTINGS.jiraUrl };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const useSettingsStore = create<Settings>()(devtools(() => loadSettings()));

/** Сохраняет настройки в localStorage и обновляет стор */
export const saveSettings = (settings: Settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Не удалось сохранить настройки", e);
  }
  useSettingsStore.setState(settings);
};
