# Jira Analyzer

![GitHub package.json version](https://shields.io)

A data analytics tool that processes Jira tasks exported in CSV format to uncover project insights and performance metrics. Инструмент аналитики данных, который обрабатывает задачи Jira, экспортированные в формате CSV, для выявления инсайтов проекта и метрик эффективности.

## Stage / Стейдж

https://jira-analyzer-ten.vercel.app/

## How to export data from Jira / Экспорт данных из Jira

### 1. Enable an advanced search / Включить продвинутый поиск

### 2. Example of a request to export data via advanced search / Пример запроса для выгрузки данных через продвинутый поиск

```sql
assignee = currentUser() AND status not in (New) AND created >= startOfYear() ORDER BY created ASC
```

### 3. Select the required fields for analysis / Выбрать требуемые поля для анализа

- Issue key / Ключ проблемы
- Summary / Тема
- Status / Статус
- Created / Создано
- Updated / Обновлено
- Original Estimate / Первоначальная оценка

## Commands / Команды

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm lint
```
