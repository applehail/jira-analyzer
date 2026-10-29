import { create } from "zustand";
import { devtools } from "zustand/middleware";

// import type { ConfigSchema } from "@/model/config/config-model";

type InterfaceState = {
  // config: any;
  title?: string;
  obj?: any;
  showCategories: boolean;
  showLoader: boolean;
  clearSearch: boolean;
  /** окно поиска места по ГРЗ открыто */
  plateSearchOpen: boolean;
  // config: ConfigSchema;
};

const defaultInterfaceState: InterfaceState = {
  title: "",
  obj: undefined,
  showCategories: true,
  showLoader: false,
  clearSearch: false,
  plateSearchOpen: false,
  // config: {},
};

export const useInterfaceStore = create<InterfaceState>()(
  devtools((_set) => {
    return {
      ...defaultInterfaceState,
    };
  }),
);

// export const setConfig = (config: ConfigSchema) => useInterfaceStore.setState({ config });

export const setTitle = (title: string) => useInterfaceStore.setState({ title });

export const setObj = (obj: any) => useInterfaceStore.setState({ obj });

export const setShowCategories = (val: boolean) => useInterfaceStore.setState({ showCategories: val });

export const setShowLoader = (val: boolean) => useInterfaceStore.setState({ showLoader: val });

export const setClearSearch = (val: boolean) => useInterfaceStore.setState({ clearSearch: val });


export const setPlateSearchOpen = (plateSearchOpen: boolean) => useInterfaceStore.setState({ plateSearchOpen });
