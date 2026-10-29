import { DownloadIcon, PrinterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export type ExportData = {
  /** Имя файла без расширения и заголовок PDF */
  name: string;
  headers: string[];
  rows: string[][];
};

const escapeCsv = (value: string) => (/[";\r\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value);

const escapeHtml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** CSV с разделителем «;» и BOM — так Excel (рус. локаль) корректно открывает кириллицу */
const exportCsv = ({ name, headers, rows }: ExportData) => {
  const text = [headers, ...rows].map((r) => r.map(escapeCsv).join(";")).join("\r\n");
  const url = URL.createObjectURL(new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

/** PDF через системный диалог печати («Сохранить как PDF») — без доп. зависимостей и со встроенной поддержкой кириллицы */
const exportPdf = ({ name, headers, rows }: ExportData) => {
  const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>${escapeHtml(name)}</title>
<style>
  body { font-family: Arial, sans-serif; font-size: 11px; margin: 16px; }
  h1 { font-size: 16px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #999; padding: 3px 6px; text-align: left; }
  th { background: #eee; }
  tr { page-break-inside: avoid; }
  thead { display: table-header-group; }
  @page { size: A4 landscape; margin: 10mm; }
</style></head><body>
<h1>${escapeHtml(name)}</h1>
<table><thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>
</body></html>`;

  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;width:0;height:0;border:0;visibility:hidden";
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;
  if (!doc || !win) {
    iframe.remove();
    return;
  }
  doc.open();
  doc.write(html);
  doc.close();
  win.onafterprint = () => iframe.remove();
  win.focus();
  win.print();
};

export type ExportButtonsProps = {
  data: ExportData;
};

export const ExportButtons = ({ data }: ExportButtonsProps) => (
  <div className="flex gap-2">
    <Button variant="outline" onClick={() => exportCsv(data)}>
      <DownloadIcon /> CSV
    </Button>
    <Button variant="outline" onClick={() => exportPdf(data)}>
      <PrinterIcon /> PDF
    </Button>
  </div>
);
