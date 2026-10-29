export type TitleProps = {
  children: React.ReactNode;
};

export const Title = ({ children }: TitleProps) => {
  return <div className="text-lg mb-3">{children}</div>;
};
