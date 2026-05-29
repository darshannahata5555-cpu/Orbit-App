"use client";

import { CheckSquare, FileText, IndianRupee, MessageCircle, Search, Sheet, Truck } from "lucide-react";
import { files, reimbursements, tasks } from "@/lib/mock-data";

const categories = [
  { label: "Tasks", detail: "Assignments, blockers, owners, deadlines", count: tasks.length, icon: CheckSquare },
  { label: "Messages", detail: "Mentions, announcements, team updates", count: 18, icon: MessageCircle },
  { label: "Files", detail: "Posters, layouts, invoices, contracts", count: files.length, icon: FileText },
  { label: "Vendors", detail: "Printing, stage, catering, hospitality", count: 4, icon: Truck },
  { label: "Reimbursements", detail: "Approvals, invoices, transaction proof", count: reimbursements.length, icon: IndianRupee },
  { label: "Sheets", detail: "Budget tracker, vendor sheet, task exports", count: 3, icon: Sheet },
];

export function SearchPanel() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-[30px] font-semibold">Global Search</h1>
        <p className="mt-2 text-sm text-neutral-600">Find anything connected to the event.</p>
      </div>

      <div className="rounded-[22px] bg-white p-4 shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
        <div className="flex items-center gap-3 rounded-[16px] bg-[#F0F0ED] px-4 py-3">
          <Search className="h-5 w-5 text-neutral-500" />
          <input className="w-full bg-transparent text-base outline-none placeholder:text-neutral-500" placeholder="Search tasks, files, vendors, reimbursements" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} className="rounded-[20px] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D8D8D6]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold">{item.count}</span>
              </div>
              <p className="mt-4 text-lg font-semibold">{item.label}</p>
              <p className="mt-1 text-sm leading-5 text-neutral-600">{item.detail}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
