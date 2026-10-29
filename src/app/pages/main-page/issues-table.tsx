import { useMemo } from "react";
import dayjs from "dayjs";

import { Button } from "@/components/ui/button";
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { estimateSeconds, parseJiraDate, type JiraIssue } from "@/model/jira-csv";
import { useMq } from "@/libs/hooks";
import { useJiraUrl } from "@/store";
import { ExportButtons, type ExportData } from "./export-table";

const formatDate = (value: string) => {
  const d = parseJiraDate(value);
  return d ? dayjs(d).format("DD.MM.YYYY") : "—";
};

/** Оценка приходит в секундах → «Xч. Yм.» */
const formatEstimate = (value: string) => {
  const seconds = Number(value);
  if (value.trim() === "" || Number.isNaN(seconds)) return "—";
  const minutes = Math.round(seconds / 60);
  const parts = [Math.floor(minutes / 60) && `${Math.floor(minutes / 60)}ч.`, minutes % 60 && `${minutes % 60}м.`].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "—";
};

type Column = {
  key: keyof JiraIssue;
  title: string;
  className?: string;
  render: (issue: JiraIssue, jiraUrl: string) => React.ReactNode;
};

const COLUMNS: Column[] = [
  {
    key: "issueKey",
    title: "Ключ",
    render: (i, jiraUrl) => (
      <Button variant="secondary" size="xs" nativeButton={false} render={<a href={`${jiraUrl}${i.issueKey}`} target="_blank" rel="noreferrer" />}>
        {i.issueKey}
      </Button>
    ),
  },
  { key: "summary", title: "Тема", className: "max-w-md truncate", render: (i) => i.summary },
  { key: "status", title: "Статус", className: "max-w-24 truncate", render: (i) => i.status },
  { key: "created", title: "Создана", render: (i) => formatDate(i.created) },
  { key: "updated", title: "Обновлена", render: (i) => formatDate(i.updated) },
  { key: "originalEstimate", title: "Оценка", render: (i) => formatEstimate(i.originalEstimate) },
];

export type IssuesTableProps = {
  issues: JiraIssue[];
  /** Если задано — над таблицей показываются кнопки выгрузки в CSV/PDF с этим именем */
  exportName?: string;
};

/** anchor — id якоря, задан у первой задачи месяца */
type Row = { type: "issue"; issue: JiraIssue; anchor?: string } | { type: "total"; month: string; seconds: number };

const monthAnchorId = (key: string) => `month-${key}`;

const scrollToMonth = (key: string) => document.getElementById(monthAnchorId(key))?.scrollIntoView({ behavior: "smooth", block: "start" });

/** Список карточек вместо таблицы на узких экранах */
const IssuesCards = ({ rows, jiraUrl }: { rows: Row[]; jiraUrl: string }) => (
  <div className="flex flex-col">
    {rows.map((row, i) =>
      row.type === "total" ? (
        <div key={`total-${i}`} className="flex justify-between gap-2 bg-yellow-100 p-2 font-medium dark:bg-yellow-900/40">
          <span>Итого за {row.month}</span>
          <span className="whitespace-nowrap">{formatEstimate(String(row.seconds))}</span>
        </div>
      ) : (
        <div
          key={`${row.issue.issueKey}-${i}`}
          id={row.anchor && monthAnchorId(row.anchor)}
          className="flex scroll-mt-[calc(var(--header-h)+3rem)] flex-col gap-1 border-b p-2"
        >
          <div className="flex items-center justify-between gap-2">
            {COLUMNS[0].render(row.issue, jiraUrl)}
            <span className="truncate text-xs text-muted-foreground">{row.issue.status}</span>
          </div>
          <div className="break-words">{row.issue.summary}</div>
          <div className="flex flex-wrap justify-between gap-x-3 text-xs text-muted-foreground">
            <span>Создана: {formatDate(row.issue.created)}</span>
            <span>Обновлена: {formatDate(row.issue.updated)}</span>
            <span>Оценка: {formatEstimate(row.issue.originalEstimate)}</span>
          </div>
        </div>
      ),
    )}
  </div>
);

/** Добавляет ряд с суммой оценки по месяцу: перед первой задачей нового месяца (кроме первого ряда) и после последней задачи. */
const buildRows = (issues: JiraIssue[]): Row[] => {
  const rows: Row[] = [];
  let month: string | null = null;
  let seconds = 0;
  const pushTotal = () => {
    if (month !== null) rows.push({ type: "total", month: dayjs(`${month}-01`).format("MMMM YYYY"), seconds });
    seconds = 0;
  };
  for (const issue of issues) {
    const d = parseJiraDate(issue.created);
    const key: string | null = d ? dayjs(d).format("YYYY-MM") : month;
    const isNewMonth = key !== month;
    if (isNewMonth) pushTotal();
    month = key;
    seconds += estimateSeconds(issue.originalEstimate);
    rows.push({ type: "issue", issue, anchor: isNewMonth && key ? key : undefined });
  }
  pushTotal();
  return rows;
};

export const IssuesTable = ({ issues, exportName }: IssuesTableProps) => {
  const jiraUrl = useJiraUrl();
  const { isMobile } = useMq();
  const rows = useMemo(() => buildRows(issues), [issues]);
  const exportData = useMemo<ExportData>(
    () => ({
      name: exportName ?? "",
      headers: COLUMNS.map((c) => c.title),
      rows: rows.map((row) =>
        row.type === "total"
          ? [`Итого за ${row.month}`, ...COLUMNS.slice(2).map(() => ""), formatEstimate(String(row.seconds))].slice(0, COLUMNS.length)
          : [row.issue.issueKey, row.issue.summary, row.issue.status, formatDate(row.issue.created), formatDate(row.issue.updated), formatEstimate(row.issue.originalEstimate)],
      ),
    }),
    [rows, exportName],
  );
  const months = useMemo(
    () => rows.flatMap((r) => (r.type === "issue" && r.anchor ? [{ key: r.anchor, label: dayjs(`${r.anchor}-01`).format("MMMM YYYY") }] : [])),
    [rows],
  );
  if (issues.length === 0) return <p className="pt-3 text-muted-foreground">Нет данных</p>;

  return (
    <>
      {exportName && (
        <div className="my-3">
          <ExportButtons data={exportData} />
        </div>
      )}
      {months.length > 0 && (
        <div className="sticky top-(--header-h) z-10 flex flex-wrap gap-2 border-b bg-background py-2">
          {months.map((m) => (
            <Button key={m.key} variant="outline" size="xs" onClick={() => scrollToMonth(m.key)}>
              {m.label}
            </Button>
          ))}
        </div>
      )}
      {isMobile ? (
        <IssuesCards rows={rows} jiraUrl={jiraUrl} />
      ) : (
      <Table>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((c) => (
            <TableHead key={c.key} className={c.key === "status" ? "max-w-24" : undefined}>
              {c.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) =>
          row.type === "total" ? (
            <TableRow key={`total-${i}`} className="bg-yellow-100 font-medium hover:bg-yellow-100 dark:bg-yellow-900/40 dark:hover:bg-yellow-900/40">
              <TableCell colSpan={COLUMNS.length - 1}>Итого за {row.month}</TableCell>
              <TableCell>{formatEstimate(String(row.seconds))}</TableCell>
            </TableRow>
          ) : (
            <TableRow key={`${row.issue.issueKey}-${i}`} id={row.anchor && monthAnchorId(row.anchor)} className="scroll-mt-[calc(var(--header-h)+3rem)]">
              {COLUMNS.map((c) => (
                <TableCell key={c.key} className={c.className} title={c.key === "summary" || c.key === "status" ? row.issue[c.key] : undefined}>
                  {c.render(row.issue, jiraUrl)}
                </TableCell>
              ))}
            </TableRow>
          ),
        )}
      </TableBody>
      </Table>
      )}
    </>
  );
};
