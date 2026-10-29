export type Size = {
  width: number | undefined;
  height: number | undefined;
};

export type ThemeType = "dark" | "light";

export type StorageInterface = {
  getItem: (name: string) => any;
  setItem: (name: string, val: any) => void;
  clear: () => void;
};

export interface StorageConstructor {
  new (namespace: string): StorageInterface;
}

// export type Simplify0<T> = T extends object ? { [K in keyof T]: Simplify<T[K]> } : T;
export type Simplify<T> = T extends (...args: any[]) => any ? T : T extends object ? { [K in keyof T]: Simplify<T[K]> } : T;
