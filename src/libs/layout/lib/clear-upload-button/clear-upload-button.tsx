import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { clearUpload, useIssues } from "@/store";

/** Кнопка «Очистить данные: видна только при наличии сохранённых данных парсинга. */
export const ClearUploadButton = () => {
  const issues = useIssues();
  if (!issues) return null;
  const title = "Очистить данные";

  return (
    <Button variant="destructive" aria-label={title} title={title} onClick={clearUpload}>
      <Trash2Icon data-icon="inline-start" />
      <span className="hidden sm:inline">{title}</span>
    </Button>
  );
};
