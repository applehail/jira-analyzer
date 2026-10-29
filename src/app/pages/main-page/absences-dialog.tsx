import { useMemo, useState } from "react";
import { CalendarOffIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormInput } from "@/libs/form";
import type { WorkloadRow } from "@/model/workload";
import { saveAbsences, type Absences } from "@/store";

type AbsencesForm = Record<string, unknown>;

/** Имя поля формы по месяцу «MM.YYYY» (точка в имени RHF означает вложенность) */
const fieldName = (date: string) => `m${date.replace(".", "_")}`;

export type AbsencesDialogProps = {
  rows: WorkloadRow[];
  absences: Absences;
};

/** Кнопка «Отпускные/больничные дни» и диалог с вводом пропущенных дней по каждому месяцу. */
export const AbsencesDialog = ({ rows, absences }: AbsencesDialogProps) => {
  const [open, setOpen] = useState(false);

  const schema = useMemo(
    () =>
      z.record(z.string(), z.coerce.number<unknown>("Введите число").int("Целое число").min(0, "Не меньше 0")).superRefine((values, ctx) => {
        for (const row of rows) {
          const name = fieldName(row.date);
          if (values[name] > row.workDays) ctx.addIssue({ code: "custom", path: [name], message: `Не больше ${row.workDays}` });
        }
      }),
    [rows],
  );

  const defaultValues = Object.fromEntries(rows.map((r) => [fieldName(r.date), absences[r.date] ? String(absences[r.date]) : ""]));

  const handleSubmit = (values: Record<string, number>) => {
    const entries = rows.map((r) => [r.date, values[fieldName(r.date)] ?? 0] as const).filter(([, days]) => days > 0);
    saveAbsences(Object.fromEntries(entries));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <CalendarOffIcon data-icon="inline-start" />
        Отпускные/больничные дни
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Отпускные/больничные дни</DialogTitle>
          <DialogDescription>Укажите количество пропущенных рабочих дней по каждому месяцу</DialogDescription>
        </DialogHeader>
        <Form schema={schema} defaultValues={defaultValues} onSubmit={handleSubmit}>
          <div className="grid max-h-96 grid-cols-1 min-[420px]:grid-cols-2 gap-4 overflow-y-auto p-1">
            {rows.map((row) => (
              <FormInput<AbsencesForm>
                key={row.date}
                name={fieldName(row.date)}
                label={`${row.date} (рабочих дней: ${row.workDays})`}
                type="number"
                min={0}
                max={row.workDays}
                placeholder="0"
              />
            ))}
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-600/80">
              Сохранить
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
