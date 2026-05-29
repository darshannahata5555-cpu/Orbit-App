"use client";

import { AlertTriangle, Bell, CalendarClock, CheckCircle2, Clock3, IndianRupee, MessageCircle, Truck, UsersRound } from "lucide-react";
import { channels, reimbursements, supportStats, tasks } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";

const ops = [
  { time: "2:00 PM", title: "Stage setup check", team: "Operations", status: "On track" },
  { time: "4:00 PM", title: "Sponsor walkthrough", team: "Sponsorship", status: "Pending" },
  { time: "5:30 PM", title: "Speaker confirmation", team: "Hospitality", status: "Blocked" },
  { time: "7:00 PM", title: "Printing vendor payment", team: "Finance", status: "Pending" },
];

const commandStatus = [
  { team: "Stage", state: "Ready", tone: "bg-emerald-500" },
  { team: "Tech", state: "Sound check pending", tone: "bg-amber-500" },
  { team: "Sponsorship", state: "Completed", tone: "bg-emerald-500" },
  { team: "Hospitality", state: "Speaker pickup delayed", tone: "bg-rose-500" },
  { team: "Finance", state: "Settled", tone: "bg-emerald-500" },
];

const communicationGroups = [
  { title: "Mentions", icon: MessageCircle, items: ["finance-approvals", "stage-ops"] },
  { title: "Announcements", icon: Bell, items: ["all-company-announcements", "event-updates"] },
  { title: "Groups", icon: UsersRound, items: ["creative-x-copy", "offline-all-teams", "ug_midfunnel_internal"] },
];

export function DashboardSection() {
  const activeEvent = useAppStore((state) => state.activeEvent);
  const localEvents = useAppStore((state) => state.localEvents);
  const event = localEvents.find((item) => item.id === activeEvent);
  const pendingApprovals = reimbursements.filter((item) => item.status === "Pending").length;
  const criticalBlockers = tasks.filter((task) => task.priority === "Critical" || task.status === "Blocked").length;

  return (
    <section className="space-y-7">
      <div className="rounded-[26px] bg-[#111111] p-5 text-white shadow-[0_18px_45px_-32px_rgba(17,17,17,0.8)]">
        <p className="text-sm text-white/65">Event HQ</p>
        <h1 className="mt-2 text-[32px] font-semibold leading-tight">{event?.name ?? "Yugaantar 2026"}</h1>
        <p className="mt-2 text-sm text-white/65">{event?.venue ?? "Campus Amphitheater"} - {event?.date ?? "May 14 - 18"}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: "days remaining", value: "47", icon: CalendarClock },
            { label: "active tasks", value: String(supportStats.totalTasks), icon: CheckCircle2 },
            { label: "budget left", value: supportStats.remainingBudget, icon: IndianRupee },
            { label: "approvals", value: String(pendingApprovals), icon: Clock3 },
            { label: "blockers", value: String(criticalBlockers), icon: AlertTriangle },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="rounded-[16px] bg-white/10 p-3">
                <Icon className="h-4 w-4 text-white/70" />
                <p className="mt-3 text-2xl font-semibold">{metric.value}</p>
                <p className="mt-1 text-xs text-white/60">{metric.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <section className="space-y-3">
        <div>
          <h2 className="text-[24px] font-semibold">Today&apos;s Operations</h2>
          <p className="text-sm text-neutral-600">What needs attention right now</p>
        </div>
        <div className="space-y-3">
          {ops.map((item) => (
            <div key={item.title} className="flex items-center gap-4 rounded-[22px] bg-white p-4 shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
              <div className="w-16 shrink-0 text-sm font-semibold text-neutral-500">{item.time}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{item.team}</p>
              </div>
              <span className="rounded-full bg-[#D8D8D6] px-3 py-1 text-xs font-semibold">{item.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-[24px] font-semibold">Event-Day Command</h2>
          <p className="text-sm text-neutral-600">Live team status snapshot</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {commandStatus.map((item) => (
            <div key={item.team} className="rounded-[18px] bg-[#D8D8D6] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{item.team}</p>
                <span className={`h-3 w-3 rounded-full ${item.tone}`} />
              </div>
              <p className="mt-2 text-sm text-neutral-700">{item.state}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[24px] font-semibold">Communication</h2>
        <div className="space-y-6">
          {communicationGroups.map((group) => {
            const Icon = group.icon;
            return (
              <section key={group.title} className="space-y-3">
                <div className="flex items-center gap-5">
                  <span className="text-2xl font-semibold">#</span>
                  <h3 className="text-[22px] font-medium">{group.title}</h3>
                </div>
                <div className="ml-1 space-y-2">
                  {group.items.map((item) => (
                    <button key={item} className="flex w-full items-center gap-4 rounded-[14px] py-1.5 text-left transition hover:bg-white/70">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#D8D8D6]">
                        <Icon className="h-4 w-4 text-neutral-700" />
                      </span>
                      <span className="truncate text-base text-neutral-700">{item}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <div className="rounded-[22px] bg-white p-4">
        <div className="flex items-center gap-3 text-sm text-neutral-600">
          <Truck className="h-5 w-5" />
          <span>{channels.length} active channels - {pendingApprovals} finance approvals waiting</span>
        </div>
      </div>
    </section>
  );
}
