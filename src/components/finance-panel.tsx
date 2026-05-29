"use client";

import { ArrowUpRight, CheckCircle2, Clock3, IndianRupee, Plus, ReceiptText } from "lucide-react";
import { reimbursements, supportStats, tasks } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";

const queue = [
  { label: "Pending Approvals", value: reimbursements.filter((item) => item.status === "Pending").length, icon: Clock3 },
  { label: "Pending Reimbursements", value: supportStats.pendingReimbursements, icon: ReceiptText },
  { label: "Completed Reimbursements", value: reimbursements.filter((item) => item.status === "Approved").length, icon: CheckCircle2 },
];

export function FinancePanel() {
  const setSection = useAppStore((state) => state.setSection);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="min-h-[142px] rounded-[18px] bg-[#111111] p-5 text-white shadow-[0_18px_45px_-32px_rgba(17,17,17,0.8)] sm:min-h-[170px]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/70">Today</p>
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <p className="mt-8 text-4xl font-semibold">{supportStats.totalTasks}</p>
          <p className="mt-1 text-sm text-white/70">active tasks</p>
        </div>
        <div className="min-h-[142px] rounded-[18px] bg-[#E9E2D0] p-5 text-[#111111] shadow-[0_18px_45px_-35px_rgba(17,17,17,0.55)] sm:min-h-[170px]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600">Budget</p>
            <IndianRupee className="h-5 w-5" />
          </div>
          <p className="mt-8 text-4xl font-semibold">$18.2K</p>
          <p className="mt-1 text-sm text-neutral-600">remaining</p>
        </div>
      </div>

      <div className="space-y-4">
        {queue.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-[24px] bg-white p-4 shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-semibold">#{item.value}</span>
                    <h2 className="truncate text-xl font-medium">{item.label}</h2>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {tasks.slice(0, 2).map((task) => (
                      <div key={`${item.label}-${task.id}`} className="flex items-center gap-2 text-sm text-neutral-600">
                        <span className="h-3 w-3 rounded bg-[#D8D8D6]" />
                        <span className="truncate">{task.department} · {task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setSection("CreateEntry")}
        className="flex h-[88px] w-full items-center justify-center gap-3 rounded-[18px] bg-[#D8D8D6] text-lg font-medium text-[#111111] transition hover:bg-[#cececc]"
      >
        <Plus className="h-5 w-5" />
        Create New Entry
      </button>
    </section>
  );
}
