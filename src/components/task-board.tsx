"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CalendarDays, CheckCircle2, Circle, MessageSquare, UserRound } from "lucide-react";
import { tasks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const tabs = ["My Tasks", "Team Tasks"] as const;

const alerts = [
  { title: "Tech has 4 blockers", detail: "Sound check and lighting vendor confirmations are behind plan." },
  { title: "Speaker pickup delayed", detail: "Hospitality needs backup vehicle confirmation before 5:30 PM." },
  { title: "2 approvals pending", detail: "Stage Masters advance and printing bill need council signoff." },
];

const priorityStyles = {
  Critical: "bg-rose-100 text-rose-700",
  High: "bg-amber-100 text-amber-800",
  Medium: "bg-sky-100 text-sky-700",
  Low: "bg-emerald-100 text-emerald-700",
} as const;

export function TaskBoard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("My Tasks");
  const role = useAppStore((state) => state.role);
  const activeDepartment = useAppStore((state) => state.activeDepartment);
  const isDepartmentView = role === "HOD" || role === "Core Member" || role === "Member";

  const groups = useMemo(() => {
    const scopedTasks = isDepartmentView
      ? tasks.filter((task) => task.department === activeDepartment || (activeDepartment === "Ops" && task.department === "Operations"))
      : tasks;
    const fallbackTasks = scopedTasks.length ? scopedTasks : tasks.filter((task) => task.department !== "Finance");
    const visible = tab === "My Tasks" ? fallbackTasks.slice(0, 4) : fallbackTasks;
    return [
      { label: "Today", items: visible.filter((task) => task.status !== "Completed").slice(0, 3) },
      { label: "Tomorrow", items: visible.slice(2, 5) },
      { label: "Upcoming", items: visible.slice(4) },
    ];
  }, [activeDepartment, isDepartmentView, tab]);

  return (
    <section className="space-y-4">
      <section className="space-y-3">
        <div>
          <h1 className="text-xl font-semibold">Requires Attention</h1>
          <p className="text-sm text-neutral-600">{isDepartmentView ? `${activeDepartment} issues before the rest of the board` : "Fix these before managing the rest of the board"}</p>
        </div>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <button key={alert.title} className="flex w-full items-start gap-3 rounded-[18px] border border-rose-200 bg-rose-50 p-3 text-left text-rose-900">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <span className="min-w-0">
                <span className="block font-semibold">{alert.title}</span>
                <span className="mt-0.5 block text-sm opacity-80">{alert.detail}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-6">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={cn(
              "pb-2 text-[22px] font-medium transition",
              tab === item ? "border-b border-[#111111] text-[#111111]" : "text-neutral-500",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.label} className="rounded-[8px] bg-[#D8D8D6] p-4 sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[22px] font-medium">{group.label}</h2>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold">{group.items.length}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {group.items.length ? (
                group.items.map((task) => (
                  <button key={`${group.label}-${task.id}`} className="rounded-[18px] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {task.status === "Completed" ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" /> : <Circle className="mt-0.5 h-5 w-5 text-neutral-400" />}
                        <div>
                          <p className="font-semibold">{task.title}</p>
                          <p className="mt-1 text-sm leading-5 text-neutral-600">{task.description}</p>
                        </div>
                      </div>
                      <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold", priorityStyles[task.priority])}>{task.priority}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
                      <span className="rounded-full bg-[#111111] px-2.5 py-1 font-semibold text-white">{task.department}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1"><UserRound className="h-3.5 w-3.5" /> {task.assignee}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1"><CalendarDays className="h-3.5 w-3.5" /> {task.dueDate}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1"><MessageSquare className="h-3.5 w-3.5" /> {task.comments}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-[18px] bg-white/65 p-4 text-sm text-neutral-500">No tasks scheduled.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
