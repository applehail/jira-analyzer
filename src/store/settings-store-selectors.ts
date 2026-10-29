import { useSettingsStore } from "./settings-store";

export const useJiraUrl = () => {
  return useSettingsStore((state) => state.jiraUrl);
};
