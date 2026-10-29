import { useAbsencesStore } from "./absences-store";

export const useAbsences = () => {
  return useAbsencesStore((state) => state.absences);
};
