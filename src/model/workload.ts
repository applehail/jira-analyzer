import dayjs from "dayjs";

import { getCalendarByYear } from "@/libs/common";
import { estimateSeconds, parseJiraDate, type JiraIssue } from "./jira-csv";

export const HOURS_PER_DAY = 8;

export type WorkloadRow = {
  /** «MM.YYYY» */
  date: string;
  workDays: number;
  /** отпускные/больничные дни */
  absentDays: number;
  /** рабочие дни за вычетом пропущенных */
  totalDays: number;
  /** ёмкость (Итого дней × 8), часы */
  capacityHours: number;
  /** сумма Original Estimate, часы */
  estimateHours: number;
  /** оценка − ёмкость, часы */
  diffHours: number;
  /** оценка к ёмкости, %; null — нет данных о рабочих днях */
  loadPercent: number | null;
};

const buildRow = (date: string, workDays: number, absentDays: number, estimateHours: number): WorkloadRow => {
  const totalDays = Math.max(0, workDays - absentDays);
  const capacityHours = totalDays * HOURS_PER_DAY;
  return {
    date,
    workDays,
    absentDays,
    totalDays,
    capacityHours,
    estimateHours,
    diffHours: estimateHours - capacityHours,
    loadPercent: capacityHours > 0 ? (estimateHours / capacityHours) * 100 : null,
  };
};

export type Workload = {
  rows: WorkloadRow[];
  total: WorkloadRow;
  /** задачи без оценки (пусто или 0) */
  noEstimateCount: number;
  /** месяцы «MM.YYYY» годов выгрузки, в которых задач нет */
  emptyMonths: string[];
};

/** Помесячная загруженность по дате создания задач (по возрастанию месяцев) и итоговая строка. */
export const calcWorkload = (issues: JiraIssue[], absences: Record<string, number> = {}): Workload => {
  const secondsByMonth = new Map<string, number>();
  for (const issue of issues) {
    const d = parseJiraDate(issue.created);
    if (!d) continue;
    const key = dayjs(d).format("YYYY-MM");
    secondsByMonth.set(key, (secondsByMonth.get(key) ?? 0) + estimateSeconds(issue.originalEstimate));
  }

  const rows = [...secondsByMonth.keys()].sort().map((key) => {
    const [year, month] = key.split("-").map(Number);
    const workDays = getCalendarByYear(year)[month - 1]?.workDaysCount ?? 0;
    const date = `${String(month).padStart(2, "0")}.${year}`;
    return buildRow(date, workDays, absences[date] ?? 0, (secondsByMonth.get(key) ?? 0) / 3600);
  });

  const workDays = rows.reduce((s, r) => s + r.workDays, 0);
  const absentDays = rows.reduce((s, r) => s + r.absentDays, 0);
  const estimateHours = rows.reduce((s, r) => s + r.estimateHours, 0);
  const years = [...new Set([...secondsByMonth.keys()].map((key) => Number(key.slice(0, 4))))].sort();
  const emptyMonths = years.flatMap((year) =>
    Array.from({ length: 12 }, (_, i) => i + 1)
      .filter((month) => !secondsByMonth.has(`${year}-${String(month).padStart(2, "0")}`))
      .map((month) => `${String(month).padStart(2, "0")}.${year}`),
  );

  return {
    rows,
    total: buildRow("Итого", workDays, absentDays, estimateHours),
    noEstimateCount: issues.filter((i) => estimateSeconds(i.originalEstimate) === 0).length,
    emptyMonths,
  };
};
