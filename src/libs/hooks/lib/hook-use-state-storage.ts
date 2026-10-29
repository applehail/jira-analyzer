import { useState, useEffect } from "react";

import type { StorageInterface } from "@/libs/types";

export const useStateStorage = <T = unknown>(key: string, defaultValue: T, storage?: StorageInterface) => {
  // get default
  const [value, setValue] = useState(() => {
    const val = storage?.getItem(key);
    return val || defaultValue;
  });

  // set
  useEffect(() => {
    storage?.setItem(key, value);
  }, [key, storage, value]);

  return [value, setValue];
};
