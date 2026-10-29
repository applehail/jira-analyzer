import { useState } from "react";
import { AlertTriangleIcon, UploadIcon } from "lucide-react";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormFile } from "@/libs/form";
import { parseJiraCsv } from "@/model/jira-csv";
import { setIssues } from "@/store";

const schema = z.object({
  file: z
    .custom<File>((v) => v instanceof File, "Выберите файл для импорта")
    .refine((f) => f.name.toLowerCase().endsWith(".csv"), "Допустим только формат csv"),
});

type ImportForm = z.input<typeof schema>;

const JQL = "assignee = currentUser() AND status not in (New) AND created >= startOfYear() ORDER BY created ASC";

/** Кнопка «Загрузить выгрузку» и диалог с формой импорта CSV из Jira. */
export const ImportDialog = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setError(null);
  };

  const handleSubmit = async ({ file }: z.output<typeof schema>) => {
    setError(null);
    try {
      setIssues(parseJiraCsv(await file.text()), file.name);
      handleOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить файл");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" />}>
        <UploadIcon data-icon="inline-start" />
        Загрузить выгрузку
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Загрузить выгрузку из Jira</DialogTitle>
          <DialogDescription className="sr-only">Выберите csv-файл выгрузки задач из Jira</DialogDescription>
        </DialogHeader>
        <Form schema={schema} onSubmit={handleSubmit}>
          {({ formState }) => (
            <>
              <FormFile<ImportForm>
                name="file"
                label="Файл для импорта"
                accept=".csv,text/csv"
                // description={
                //   <>
                //     <span className="block">Для получения выгрузки откройте в интерфейсе Jira расширенный поиск и введите строку для поиска</span>
                //     <code className="rounded bg-muted px-2 py-0.5 text-xs">{JQL}</code>
                //   </>
                // }
              />

              <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                <AlertTriangleIcon />
                <AlertTitle>Для получения выгрузки откройте в интерфейсе Jira расширенный поиск и введите строку для поиска</AlertTitle>
                <AlertDescription>{JQL}</AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Ошибка импорта</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex justify-between">
                <Button disabled={formState.isSubmitting} className="" variant={"outline"} onClick={() => setOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit" disabled={formState.isSubmitting} className="bg-emerald-600 text-white hover:bg-emerald-600/80">
                  Загрузить
                </Button>
              </div>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
