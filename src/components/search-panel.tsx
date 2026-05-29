"use client";

import { ArrowUpRight, FileSpreadsheet, Palette, Search } from "lucide-react";

const resources = [
  { label: "Google Sheets", detail: "Budget tracker, vendor sheet, task exports", icon: FileSpreadsheet, tone: "bg-emerald-100" },
  { label: "Notion", detail: "Runbook, SOPs, team wiki, approval notes", icon: Search, tone: "bg-neutral-100" },
  { label: "Figma", detail: "Posters, signage, maps, sponsor boards", icon: Palette, tone: "bg-violet-100" },
];

export function SearchPanel() {
  return (
    <section className="space-y-6">
      <div className="rounded-[22px] bg-white p-4">
        <div className="flex items-center gap-3 rounded-[16px] bg-[#F0F0ED] px-4 py-3">
          <Search className="h-5 w-5 text-neutral-500" />
          <input className="w-full bg-transparent text-base outline-none placeholder:text-neutral-500" placeholder="Search resources, files, tasks" />
        </div>
      </div>

      <div className="space-y-5">
        {resources.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="space-y-3">
              <h2 className="text-[22px] font-medium">{item.label}</h2>
              <button className={`group flex min-h-[150px] w-full items-end justify-between rounded-[18px] ${item.tone} p-5 text-left transition hover:-translate-y-0.5 sm:min-h-[190px]`}>
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 max-w-[240px] text-sm leading-5 text-neutral-700">{item.detail}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition group-hover:scale-105">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
