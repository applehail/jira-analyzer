import { useState, type ReactNode } from "react";
import { CheckIcon, CopyIcon, ZoomInIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import step1 from "./images/step-1.png";
import step2 from "./images/step-2.png";
import step3 from "./images/step-3.png";

const JQL = "assignee = currentUser() AND status not in (New) AND created >= startOfYear() ORDER BY created ASC";

type StepProps = {
  num: number;
  title: ReactNode;
  children: ReactNode;
};

const Step = ({ num, title, children }: StepProps) => (
  <section className="flex gap-3">
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{num}</div>
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <h3 className="pt-0.5 text-sm font-medium leading-snug">{title}</h3>
      {children}
    </div>
  </section>
);

const Screenshot = ({ src, alt }: { src: string; alt: string }) => (
  <Dialog>
    <DialogTrigger
      className="group relative block cursor-zoom-in overflow-hidden rounded-lg border bg-background transition-all hover:border-primary hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      aria-label={`Увеличить: ${alt}`}
    >
      <img src={src} alt={alt} className="w-full transition-transform duration-200 group-hover:scale-[1.02]" loading="lazy" />
      <span className="absolute top-2 right-2 rounded-md bg-background/90 p-1 text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <ZoomInIcon className="size-4" />
      </span>
    </DialogTrigger>
    <DialogContent className="w-auto gap-0 p-0 sm:max-w-[calc(100vw-2rem)]">
      <DialogTitle className="sr-only">{alt}</DialogTitle>
      <img src={src} alt={alt} className="block max-h-[calc(100dvh-2rem)] max-w-full object-contain" />
    </DialogContent>
  </Dialog>
);

export const Help = () => {
  const [copied, setCopied] = useState(false);

  const copyJql = async () => {
    try {
      await navigator.clipboard.writeText(JQL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // буфер обмена недоступен
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Step num={1} title="Откройте в Jira продвинутый поиск и введите строку для поиска">
        <div className="grid gap-3 sm:grid-cols-2">
          <Screenshot src={step1} alt="Фильтр «Мои открытые задачи» и переключатель «Продвинутый»" />
          <Screenshot src={step2} alt="Строка JQL в продвинутом поиске" />
        </div>
        <div className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3">
          <code className="min-w-0 flex-1 font-mono text-xs break-words">{JQL}</code>
          <button
            type="button"
            onClick={copyJql}
            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Копировать запрос"
            title="Копировать"
          >
            {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
          </button>
        </div>
      </Step>

      <Step num={2} title="Проверьте отображаемые колонки">
        <p className="text-sm text-muted-foreground">
          Убедитесь, что отображаются колонки <b className="text-foreground">Код</b>, <b className="text-foreground">Тема</b>,{" "}
          <b className="text-foreground">Статус</b>, <b className="text-foreground">Создано</b>, <b className="text-foreground">Обновлено</b>,{" "}
          <b className="text-foreground">Первоначальная оценка</b>. Если нужных колонок нет — настройте их через кнопку{" "}
          <b className="text-foreground">Колонки</b>.
        </p>
      </Step>

      <Step num={3} title="Выгрузите результат в Excel CSV">
        <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,7rem)_1fr]">
          <Screenshot src={step3} alt="Меню «Экспорт» с вариантом Excel CSV (текущие поля)" />
          <p className="text-sm text-muted-foreground">
            Нажмите на кнопку <b className="text-foreground">Экспорт</b> и выберите вариант{" "}
            <b className="text-foreground">Excel CSV (текущие поля)</b>.
          </p>
        </div>
      </Step>
    </div>
  );
};
