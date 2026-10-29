import { Container } from "../container/container";

export type PageProps = {
  children: React.ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return (
    <div className="flex-1">
      <Container>
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </div>
  );
};
