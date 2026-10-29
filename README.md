# Jira Analyzer

A data analytics tool that processes Jira tasks exported in CSV format to uncover project insights and performance metrics.
(Инструмент аналитики данных, который обрабатывает задачи Jira, экспортированные в формате CSV, для выявления инсайтов проекта и метрик эффективности.)

## Example of a request to export data (Пример запроса для выгрузки данных)

```sql
assignee = currentUser() AND status not in (New) AND created >= startOfYear() ORDER BY created ASC
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm lint
```
