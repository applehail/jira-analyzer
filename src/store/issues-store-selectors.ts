import { useIssuesStore } from "./issues-store";

export const useIssues = () => {
  return useIssuesStore((state) => state.issues);
};

export const useIssuesFileName = () => {
  return useIssuesStore((state) => state.fileName);
};
