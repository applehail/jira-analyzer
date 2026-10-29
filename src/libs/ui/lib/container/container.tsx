export type ContainerProps = {
  children: React.ReactNode;
};
export const Container = ({ children }: ContainerProps) => {
  return <div className="container flex items-center justify-between mx-auto gap-2 px-3 py-2 sm:px-4 max-w-7xl">{children}</div>;
};
