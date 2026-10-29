import { resetApp } from "@/libs/common";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Title } from "@/libs/ui";
import { ScrollArea } from "@/components/ui/scroll-area";

export type AppErrorProps = {
  error: unknown;
  withoutStack?: boolean;
};

export const AppError = ({ error, withoutStack }: AppErrorProps) => {
  const errorTyped = error as {
    message?: string;
    stack?: string;
  };
  return (
    <div>
      <Title>Произошла ошибка</Title>
      <Alert>{errorTyped.message}</Alert>
      {!withoutStack && <ScrollArea className="h-60 rounded-md border p-4">{errorTyped.stack}</ScrollArea>}
      <Title>Вы можете:</Title>
      <Button onClick={resetApp}>Перезагрузить приложение</Button>
    </div>
  );
};
