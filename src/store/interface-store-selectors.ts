import { useInterfaceStore } from "./interface-store";

export const useTitle = () => {
  return useInterfaceStore((state) => state.title);
};

export const useObj = () => {
  return useInterfaceStore((state) => state.obj);
};

export const useShowCategories = () => {
  return useInterfaceStore((state) => state.showCategories);
};

export const useShowLoader = () => {
  return useInterfaceStore((state) => state.showLoader);
};

export const useClearSearch = () => {
  return useInterfaceStore((state) => state.clearSearch);
};


// export const useConfig =() => {
//   return useInterfaceStore((state) => state.config);
// };

// export const useCategories = () => {
//   return useInterfaceStore((state) => state.categories);
// };
