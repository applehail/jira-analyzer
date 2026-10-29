export type JiraIssue = {
  issueKey: string;
  summary: string;
  status: string;
  created: string;
  updated: string;
  originalEstimate: string;
};

export type JiraSummary = {
  count: number;
  createdFrom: Date | null;
  createdTo: Date | null;
  emptyEstimateCount: number;
  /** суммарная оценка, секунды */
  totalEstimateSeconds: number;
};

/** Столбцы выгрузки, которые импортируются: поле JiraIssue → допустимые заголовки CSV (англ. и рус. интерфейс Jira) */
const COLUMNS: Record<keyof JiraIssue, string[]> = {
  issueKey: ["Issue key", "Ключ проблемы"],
  summary: ["Summary", "Тема"],
  status: ["Status", "Статус"],
  created: ["Created", "Создано"],
  updated: ["Updated", "Обновлено"],
  originalEstimate: ["Original Estimate", "Первоначальная оценка"],
};

const normalizeHeader = (value: string) => value.trim().toLowerCase();

/** Разбор CSV: разделитель — запятая, кавычки экранируются удвоением, переводы строк допустимы внутри кавычек. */
export const parseCsv = (text: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  const src = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      endField();
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      endRow();
    } else {
      field += ch;
    }
  }
  if (inQuotes) throw new Error("Ошибка разбора CSV: не закрыта двойная кавычка");
  if (field !== "" || row.length > 0) endRow();

  return rows;
};

export const parseJiraCsv = (text: string): JiraIssue[] => {
  const rows = parseCsv(text).filter((r) => r.some((c) => c.trim() !== ""));
  if (rows.length === 0) throw new Error("Файл пуст");

  const [header, ...data] = rows;
  const names = header.map(normalizeHeader);
  const fields = Object.keys(COLUMNS) as (keyof JiraIssue)[];
  const indexes = fields.map((field) => ({
    field,
    index: names.findIndex((n) => COLUMNS[field].some((alias) => normalizeHeader(alias) === n)),
  }));
  const missing = indexes.filter((c) => c.index < 0).map((c) => COLUMNS[c.field].join(" / "));
  if (missing.length > 0) throw new Error(`В файле не найдены столбцы: ${missing.join(", ")}`);

  return data.map((cells) => {
    const issue = {} as JiraIssue;
    for (const { field, index } of indexes) issue[field] = (cells[index] ?? "").trim();
    return issue;
  });
};

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
  янв: 0,
  фев: 1,
  мар: 2,
  апр: 3,
  май: 4,
  мая: 4,
  июн: 5,
  июл: 6,
  авг: 7,
  сен: 8,
  окт: 9,
  ноя: 10,
  дек: 11,
};

/** Даты Jira: «29/Oct/26 10:15 AM», «29/окт/26 10:15»; запасной вариант — Date.parse. */
export const parseJiraDate = (value: string): Date | null => {
  const m = /^(\d{1,2})\/([^/\s]+)\/(\d{2,4})(?:\s+(\d{1,2}):(\d{2})(?:\s*([AP]M))?)?/i.exec(value.trim());
  if (m) {
    const month = MONTHS[m[2].toLowerCase().replace(/\.$/, "").slice(0, 3)];
    if (month !== undefined) {
      const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
      let hours = m[4] ? Number(m[4]) : 0;
      const meridiem = m[6]?.toUpperCase();
      if (meridiem === "PM" && hours < 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;
      return new Date(year, month, Number(m[1]), hours, m[5] ? Number(m[5]) : 0);
    }
  }
  const ts = Date.parse(value);
  return Number.isNaN(ts) ? null : new Date(ts);
};

/** Оценка в секундах; пустое или нечисловое значение — 0 */
export const estimateSeconds = (value: string): number => {
  const n = Number(value);
  return value.trim() === "" || Number.isNaN(n) ? 0 : n;
};

export const summarizeIssues = (issues: JiraIssue[]): JiraSummary => {
  let createdFrom: Date | null = null;
  let createdTo: Date | null = null;
  for (const issue of issues) {
    const d = parseJiraDate(issue.created);
    if (!d) continue;
    if (!createdFrom || d < createdFrom) createdFrom = d;
    if (!createdTo || d > createdTo) createdTo = d;
  }
  return {
    count: issues.length,
    createdFrom,
    createdTo,
    emptyEstimateCount: issues.filter((i) => i.originalEstimate === "").length,
    totalEstimateSeconds: issues.reduce((sum, i) => sum + estimateSeconds(i.originalEstimate), 0),
  };
};
