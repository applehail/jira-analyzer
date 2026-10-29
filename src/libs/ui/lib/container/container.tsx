export type ContainerProps = {
  children: React.ReactNode;
};
export const Container = ({ children }: ContainerProps) => {
  return <div className="container flex items-center justify-between mx-auto px-4 py-2 max-w-7xl">{children}</div>;
};
