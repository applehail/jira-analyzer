import { useState } from "react";
import { SettingsIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormInput } from "@/libs/form";
import { saveSettings, useSettingsStore } from "@/store";

const schema = z.object({
  jiraUrl: z.string().trim().min(1),
});

type SettingsForm = z.input<typeof schema>;

/** Кнопка «Настройки» и диалог с формой настроек приложения. */
export const SettingsDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = ({ jiraUrl }: z.output<typeof schema>) => {
    saveSettings({ jiraUrl });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" aria-label="Настройки" title="Настройки" />}>
        <SettingsIcon data-icon="inline-start" />
        <span className="hidden sm:inline">Настройки</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
          <DialogDescription className="sr-only">Настройки приложения</DialogDescription>
        </DialogHeader>
        {/* форма монтируется только при открытом диалоге — значения всегда берутся из актуального стора */}
        <Form schema={schema} defaultValues={{ jiraUrl: useSettingsStore.getState().jiraUrl }} onSubmit={handleSubmit}>
          <FormInput<SettingsForm> name="jiraUrl" label="Адрес Jira" description="Базовый адрес для ссылок на задачи, например https://jira.example.com/browse/" />
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Отменить
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
