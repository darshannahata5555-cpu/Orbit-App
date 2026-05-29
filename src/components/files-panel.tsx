"use client";

import { Archive, FileBadge, ImageIcon, Paperclip, Upload } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { files } from "@/lib/mock-data";

const previewIcons: Record<string, LucideIcon> = {
  PDF: Paperclip,
  Spreadsheet: FileBadge,
  Invoice: Archive,
  Assets: ImageIcon,
  Document: FileBadge,
};

export function FilesPanel() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-semibold">Files</h1>
          <p className="text-sm text-neutral-600">Invoices, plans, posters, contracts</p>
        </div>
        <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111111] text-white">
          <Upload className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["Invoices", "Posters", "Plans", "Sheets"].map((folder) => (
          <button key={folder} className="min-h-[80px] rounded-[14px] bg-[#D8D8D6] p-4 text-left font-medium transition hover:bg-[#cececc]">
            {folder}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {files.map((file) => {
          const Icon = previewIcons[file.type] || FileBadge;
          return (
            <button key={file.id} className="flex w-full items-center justify-between gap-4 rounded-[22px] bg-white p-4 text-left transition hover:-translate-y-0.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{file.name}</p>
                  <p className="text-sm text-neutral-500">{file.type} · {file.updated}</p>
                </div>
              </div>
              <span className="shrink-0 text-sm text-neutral-500">{file.size}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
