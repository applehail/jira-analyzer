// types
export type LoaderDefaultOptions = {
  delay: number;
  minimumLoading: number;
};

export type LoadComponent = () => Promise<{ default: React.ComponentType<unknown> }>;

export type AnyProps = {
  [key: string]: unknown;
};
