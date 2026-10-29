import { useMemo } from "react";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { JiraIssue } from "@/model/jira-csv";
import { calcWorkload, type WorkloadRow } from "@/model/workload";
import { useAbsences } from "@/store";
import { AbsencesDialog } from "./absences-dialog";
import { ExportButtons, type ExportData } from "./export-table";

const fmt = (n: number) => n.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const Cells = ({ row }: { row: WorkloadRow }) => (
  <>
    <TableCell className="text-right">{row.workDays}</TableCell>
    <TableCell className="text-right">{row.absentDays}</TableCell>
    <TableCell className="text-right">{row.totalDays}</TableCell>
    <TableCell className="text-right">{row.capacityHours}</TableCell>
    <TableCell className="text-right">{fmt(row.estimateHours)}</TableCell>
    <TableCell className="text-right">{fmt(row.diffHours)}</TableCell>
    <TableCell className="text-right">{row.loadPercent === null ? "—" : fmt(row.loadPercent)}</TableCell>
  </>
);

export type WorkloadTabProps = {
  issues: JiraIssue[];
};

export const WorkloadTab = ({ issues }: WorkloadTabProps) => {
  const absences = useAbsences();
  const { rows, total, noEstimateCount, emptyMonths } = useMemo(() => calcWorkload(issues, absences), [issues, absences]);
  if (rows.length === 0) return <p className="pt-3 text-muted-foreground">Нет данных</p>;

  const exportData: ExportData = {
    name: "Оценка загруженности",
    headers: ["Дата", "Рабочих дн", "Пропущено дн", "Итого дн", "Рабочих ч", "Оценка, ч", "Разница, ч", "Загрузка, %"],
    rows: [...rows, total].map((r) => [
      r.date,
      String(r.workDays),
      String(r.absentDays),
      String(r.totalDays),
      String(r.capacityHours),
      fmt(r.estimateHours),
      fmt(r.diffHours),
      r.loadPercent === null ? "—" : fmt(r.loadPercent),
    ]),
  };

  const warnings = [
    noEstimateCount > 0 && `У ${noEstimateCount} задач из ${issues.length} Оценка не заполнена (учтён как 0 ч)`,
    emptyMonths.length > 0 && `В месяцах ${emptyMonths.join(", ")} задач в выгрузке нет, поэтому итоговая загрузка занижена`,
  ].filter(Boolean);

  return (
    <div className="mt-3 flex flex-col gap-3">
      <Alert className="border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
        <InfoIcon />
        <AlertDescription className="text-current">Месяц задачи определяется по дате создания. Рабочие часы считаются за 8 ч в день</AlertDescription>
      </Alert>
      <div className="flex flex-wrap gap-2">
        <AbsencesDialog rows={rows} absences={absences} />
        <ExportButtons data={exportData} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата</TableHead>
            <TableHead className="text-right">Рабочих дн</TableHead>
            <TableHead className="text-right">Пропущено дн</TableHead>
            <TableHead className="text-right">Итого дн</TableHead>
            <TableHead className="text-right">Рабочих ч</TableHead>
            <TableHead className="text-right">Оценка, ч</TableHead>
            <TableHead className="text-right">Разница, ч</TableHead>
            <TableHead className="text-right">Загрузка, %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell>{row.date}</TableCell>
              <Cells row={row} />
            </TableRow>
          ))}
          <TableRow className="bg-gray-100 font-medium hover:bg-gray-200 dark:bg-yellow-900/40 dark:hover:bg-yellow-900/40">
            <TableCell>{total.date}</TableCell>
            <Cells row={total} />
          </TableRow>
        </TableBody>
      </Table>
      {warnings.length > 0 && (
        <Alert className="border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          <TriangleAlertIcon />
          <AlertTitle>{warnings[0]}</AlertTitle>
          {warnings.length > 1 && <AlertDescription className="text-current">{warnings[1]}</AlertDescription>}
        </Alert>
      )}
    </div>
  );
};
