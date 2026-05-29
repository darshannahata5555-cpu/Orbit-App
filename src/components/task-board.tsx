"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Circle, MessageSquare, UserRound } from "lucide-react";
import { tasks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = ["My Tasks", "Team Tasks"] as const;

export function TaskBoard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("My Tasks");

  const groups = useMemo(() => {
    const visible = tab === "My Tasks" ? tasks.slice(0, 4) : tasks;
    return [
      { label: "Today", items: visible.filter((task) => task.status !== "Completed").slice(0, 3) },
      { label: "Tomorrow", items: visible.slice(2, 5) },
      { label: "Upcoming", items: visible.slice(4) },
    ];
  }, [tab]);

  return (
    <section className="space-y-4">
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
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
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
