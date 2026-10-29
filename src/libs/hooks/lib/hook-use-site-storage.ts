import { getLocalStorage } from "@/libs/common";

export const useSiteStorage = () => {
  return getLocalStorage("site");
};
