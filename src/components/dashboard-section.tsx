"use client";

import { AlertTriangle, CalendarClock, CheckCircle2, Clock3, IndianRupee } from "lucide-react";
import { reimbursements, supportStats, tasks } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";

const ops = [
  { time: "2 PM", title: "Stage setup", team: "Operations", status: "On track", tone: "bg-emerald-100 text-emerald-800" },
  { time: "4 PM", title: "Sponsor walkthrough", team: "Sponsorship", status: "Pending", tone: "bg-amber-100 text-amber-900" },
  { time: "5:30 PM", title: "Speaker confirmation", team: "Hospitality", status: "Blocked", tone: "bg-rose-100 text-rose-800" },
];

const teamHealth = [
  { team: "Marketing", health: 92, note: "launch calendar ready", tone: "bg-emerald-500" },
  { team: "Operations", health: 71, note: "2 vendor checks open", tone: "bg-amber-500" },
  { team: "Tech", health: 54, note: "4 blockers need HOD", tone: "bg-rose-500" },
  { team: "Hospitality", health: 88, note: "speaker desk staffed", tone: "bg-emerald-500" },
];

export function DashboardSection() {
  const activeEvent = useAppStore((state) => state.activeEvent);
  const localEvents = useAppStore((state) => state.localEvents);
  const event = localEvents.find((item) => item.id === activeEvent);
  const pendingApprovals = reimbursements.filter((item) => item.status === "Pending").length;
  const criticalBlockers = tasks.filter((task) => task.priority === "Critical" || task.status === "Blocked").length;

  const metrics = [
    { label: "days", value: "47d", icon: CalendarClock },
    { label: "tasks", value: String(supportStats.totalTasks), icon: CheckCircle2 },
    { label: "left", value: supportStats.remainingBudget, icon: IndianRupee },
    { label: "approvals", value: String(pendingApprovals), icon: Clock3 },
    { label: "blockers", value: String(criticalBlockers), icon: AlertTriangle },
  ];

  return (
    <section className="space-y-5">
      <div className="rounded-[22px] bg-[#111111] p-4 text-white shadow-[0_18px_45px_-32px_rgba(17,17,17,0.8)]">
        <p className="text-xs text-white/60">Event HQ</p>
        <h1 className="mt-1 text-[30px] font-semibold leading-tight">{event?.name ?? "Yugaantar 2026"}</h1>
        <p className="mt-1 text-xs text-white/60">{event?.venue ?? "Campus Amphitheater"} - {event?.date ?? "May 14 - 18"}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className={`rounded-[14px] p-3 ${metric.label === "blockers" ? "bg-rose-500/25" : "bg-white/10"}`}>
                <Icon className="h-4 w-4 text-white/65" />
                <p className="mt-2 text-xl font-semibold">{metric.value}</p>
                <p className="text-[11px] text-white/55">{metric.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Today&apos;s Operations</h2>
            <p className="text-sm text-neutral-600">Next three checkpoints</p>
          </div>
          <button className="text-sm font-semibold text-neutral-600">View all</button>
        </div>
        <div className="space-y-2">
          {ops.map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-[18px] bg-white p-3 shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-base font-semibold">{item.title}</p>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.tone}`}>{item.status}</span>
                </div>
                <p className="mt-1 text-xs text-neutral-600">{item.team} - {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold">Team Health</h2>
          <p className="text-sm text-neutral-600">Where leads should intervene first</p>
        </div>
        <div className="space-y-2">
          {teamHealth.map((item) => (
            <div key={item.team} className="rounded-[18px] bg-white p-3 shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold">{item.team}</p>
                  <p className="mt-0.5 truncate text-xs text-neutral-600">{item.note}</p>
                </div>
                <p className="text-base font-semibold">{item.health}%</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.health}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
