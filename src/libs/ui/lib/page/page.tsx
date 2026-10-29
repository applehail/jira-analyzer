import { Container } from "../container/container";

export type PageProps = {
  children: React.ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return (
    <div className="flex-1">
      <Container>{children}</Container>
    </div>
  );
};
