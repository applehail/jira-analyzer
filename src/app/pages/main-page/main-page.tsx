import { useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { summarizeIssues } from "@/model/jira-csv";
import { useIssues, useIssuesFileName } from "@/store";
import { IssuesTable } from "./issues-table";
import { SummaryTab } from "./summary-tab";
import { WorkloadTab } from "./workload-tab";
import { Help } from "@/libs/ui";

export const MainPage = () => {
  const issues = useIssues();
  const fileName = useIssuesFileName();
  const summary = useMemo(() => (issues ? summarizeIssues(issues) : null), [issues]);
  const noEstimate = useMemo(() => (issues ?? []).filter((i) => i.originalEstimate === "" || Number(i.originalEstimate) === 0), [issues]);
  if (!issues || !summary) {
    return (
      <>
        <p className="text-muted-foreground text-sm mt-2 mb-5">Данные для анализа отсутствуют, загрузите данные из Jira</p>
        <Help />
      </>
    );
  }

  return (
    <div className="mt-1">
      <Tabs defaultValue="summary">
        <TabsList variant="line" className="w-full max-w-full justify-start overflow-x-auto overflow-y-hidden p-0 group-data-horizontal/tabs:h-9">
          <TabsTrigger className="flex-none px-2 group-data-horizontal/tabs:after:bottom-0" value="summary">
            Общая информация
          </TabsTrigger>
          <TabsTrigger className="flex-none px-2 group-data-horizontal/tabs:after:bottom-0" value="data">
            Данные ({issues.length})
          </TabsTrigger>
          <TabsTrigger className="flex-none px-2 group-data-horizontal/tabs:after:bottom-0" value="no-estimate">
            Задачи без оценки ({noEstimate.length})
          </TabsTrigger>
          <TabsTrigger className="flex-none px-2 group-data-horizontal/tabs:after:bottom-0" value="workload">
            Оценка загруженности
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <SummaryTab summary={summary} fileName={fileName} />
        </TabsContent>
        <TabsContent value="data">
          <IssuesTable issues={issues} />
        </TabsContent>
        <TabsContent value="no-estimate">
          <IssuesTable issues={noEstimate} exportName="Задачи без оценки" />
        </TabsContent>
        <TabsContent value="workload">
          <WorkloadTab issues={issues} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
