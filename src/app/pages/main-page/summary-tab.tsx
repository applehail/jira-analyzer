import dayjs from "dayjs";

import { List } from "@/libs/ui";
import type { JiraSummary } from "@/model/jira-csv";

const formatDate = (d: Date | null) => (d ? dayjs(d).format("DD.MM.YYYY") : "—");

export type SummaryTabProps = {
  summary: JiraSummary;
  fileName?: string | null;
};

export const SummaryTab = ({ summary, fileName }: SummaryTabProps) => (
  <div className="mt-3">
    <List
      items={[
        ...(fileName ? [{ name: "Файл выгрузки", value: fileName }] : []),
        { name: "Начало выгрузки", value: formatDate(summary.createdFrom) },
        { name: "Конец выгрузки", value: formatDate(summary.createdTo) },
        { name: "Количество записей", value: summary.count },
        { name: "Всего часов оценки", value: (summary.totalEstimateSeconds / 3600).toFixed(1) },
        { name: "Записей без оценки", value: summary.emptyEstimateCount },
      ]}
    />
  </div>
);
